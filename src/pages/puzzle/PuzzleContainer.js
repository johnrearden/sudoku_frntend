import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import { Button, Col, Container, Row } from 'react-bootstrap';
import DigitChooser from '../../components/DigitChooser';
import Puzzle from '../../components/Puzzle';
import { CompletenessDisplay } from '../../components/CompletenessDisplay';
import { checkCellValidity, getExhaustedDigits, replaceCharAt } from '../../utils/utils';
import { DIFFICULTY_LEVELS } from '../../constants/constants';
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/PuzzleContainer.module.css'
import { LCLSTRG_KEY } from '../../constants/constants';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Timer from '../../components/Timer';


const PuzzleContainer = () => {

    const { difficulty } = useParams();
    const [puzzleData, setPuzzleData] = useState({
        grid: Array(82).join('-')
    });
    const [completeness, setCompleteness] = useState(0);

    // Digits already placed 9 times in the puzzle
    const [exhaustedDigits, setExhaustedDigits] = useState([]);

    const history = useHistory();
    const currentUser = useCurrentUser();

    // Current cell selected by user.
    const [selectedCellIndex, setSelectedCellIndex] = useState(0);

    // The row, col or square in which a digit appears twice
    const [warningGroup, setWarningGroup] = useState([]);

    // The cell that duplicated the value of the current selected cell.
    const [clashingCell, setClashingCell] = useState(-1);


    const [undoStack, setUndoStack] = useState([]);

    // Tests if a digit is valid in the current selected cell, and displays
    // the warnings if not.
    const performValidityCheck = (digit) => {
        const { isValid, clashingCell, group } = checkCellValidity(
            puzzleData.grid, selectedCellIndex, digit);
        if (!isValid) {
            setWarningGroup(group);
            setClashingCell(clashingCell);
        } else {
            if (warningGroup.length > 0) {
                setWarningGroup([]);
                setClashingCell(-1);
            }
        }
    }

    const handleDigitChoice = (digit) => {
        const currentSelectedCellValue = puzzleData.grid[selectedCellIndex];

        performValidityCheck(digit);

        setPuzzleData(prevData => {
            const index = selectedCellIndex;
            const grid = prevData.grid;
            const newGrid = replaceCharAt(grid, index, digit);
            const newData = {
                ...prevData,
                grid: newGrid,
            }
            window.localStorage.setItem(LCLSTRG_KEY, JSON.stringify(newData));
            return newData;
        })

        setUndoStack(prev => {
            const undoItem = {
                index: selectedCellIndex,
                previousValue: currentSelectedCellValue
            }
            return [...prev, undoItem];
        });

    }

    const handleCellSelection = (index) => {
        if (warningGroup.length === 0) {
            setSelectedCellIndex(index);
        }
    }

    const handleUndo = () => {
        if (undoStack.length < 1) {
            alert('This is the original puzzle - can\'t undo from here')
            return;
        }
        const itemToUndo = undoStack[undoStack.length - 1];
        const { index, previousValue } = itemToUndo;

        setPuzzleData(prev => {
            const newData = {
                ...prev,
                grid: replaceCharAt(puzzleData.grid, index, previousValue)
            }
            window.localStorage.setItem(LCLSTRG_KEY, JSON.stringify(newData));
            return newData;
        })
    

    setUndoStack(prev => {
        prev.pop()
        return prev;
    });
    performValidityCheck(previousValue);
}

// Load data on mount.
useEffect(() => {
    const handleMount = async () => {
        try {
            const url = `/get_random_puzzle/${difficulty}/`;
            const { data } = await axiosReq.get(url);
            setPuzzleData(data);

        } catch (err) {
            console.log(err.toJSON());
            history.push('/');
        }
    }
    const previousPuzzle = window.localStorage.getItem(LCLSTRG_KEY);
    if (previousPuzzle) {
        const puzzleData = JSON.parse(previousPuzzle);
        setPuzzleData(puzzleData);
    } else {
        handleMount();
    }
    
}, [difficulty, history])


// Update completeness each time the grid changes
useEffect(() => {
    if (puzzleData.grid != null) {
        const emptyCells = puzzleData.grid.split('').filter(chr => chr !== '-');
        const completeness = emptyCells.length / 81 * 100;
        setCompleteness(completeness);
    }
    if (puzzleData.grid) {
        setExhaustedDigits(getExhaustedDigits(puzzleData.grid));
    }
}, [puzzleData, currentUser])


// Submit the puzzle if completeness hits 100%
useEffect(() => {
    const submitCompletedPuzzle = async() => {
        const formData = new FormData();
        formData.append("owner", currentUser?.pk);
        formData.append("puzzle", puzzleData.id);
        formData.append("grid", puzzleData.grid);
        formData.append("started_on", puzzleData.start_time);
        formData.append("completed_at", new Date().toISOString());
        formData.append("completed", "true");
        
        try {
            const {data} = await axiosReq.post('/create_puzzle_instance/', formData);
            window.setTimeout(() => history.push(`/leaderboard/${data.id}`), 2000);
        } catch (err) {
            console.log(err);
        }
    }
    if (completeness >= 100) {
        window.localStorage.removeItem(LCLSTRG_KEY);
        submitCompletedPuzzle();
    }
}, [completeness, currentUser, puzzleData, history]) 

// Set success message style
const successStyle = 
    completeness === 100 
    ? `${styles.SuccessMessage} ${styles.RevealMessage}` 
    : `${styles.SuccessMessage}`;

return (
    <Container>
        <Row className="d-flex justify-content-center mt-3">
            <p className="mr-5">{DIFFICULTY_LEVELS[difficulty].toUpperCase()}</p>
            <Timer startTime={puzzleData.start_time}></Timer>
        </Row>
        <Row className="mt-2">
            <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }}>
                <CompletenessDisplay
                    completenessPercentage={Math.round(completeness)}
                    shorthand />
            </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-4 position-relative">
            <Puzzle
                grid={puzzleData?.grid}
                selectedCell={selectedCellIndex}
                handleCellSelection={handleCellSelection}
                warningGroup={warningGroup}
                clashingCell={clashingCell}
                completed={completeness === 100} />
            <div className={successStyle}>
                <h1>Well Done!</h1>
            </div>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
            <DigitChooser
                exhaustedDigits={exhaustedDigits}
                handleDigitChoice={handleDigitChoice} />

        </Row>
        <Row className="d-flex justify-content-center mt-3">
            <Button
                className={`${btnStyles.Button} mx-2`}
                onClick={handleUndo}>
                <i className="fa-solid fa-arrow-rotate-left"></i>
            </Button>
        </Row>

    </Container>
)
}

export default PuzzleContainer