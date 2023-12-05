import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import { Col, Container, Row } from 'react-bootstrap';
import DigitChooser from '../../components/DigitChooser';
import Puzzle from '../../components/Puzzle';
import { CompletenessDisplay } from '../../components/CompletenessDisplay';
import { checkCellValidity, replaceCharAt } from '../../utils/utils';
import { DIFFICULTY_LEVELS } from '../../constants/constants';
import styles from '../../styles/PuzzleContainer.module.css';


const PuzzleContainer = () => {

    const { difficulty } = useParams();
    const [puzzleData, setPuzzleData] = useState({});
    const [completeness, setCompleteness] = useState(0);

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
            return {
                ...prevData,
                grid: newGrid,
            }
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

    const deleteSelectedCell = () => {
        setWarningGroup([]);
        setClashingCell(-1);
        const newGrid = replaceCharAt(puzzleData.grid, selectedCellIndex, '-');
        setPuzzleData(prev => ({
            ...prev,
            grid: newGrid,
        }))
    }

    const handleUndo = () => {
        if (undoStack.length < 1) {
            alert('This is the original puzzle - can\'t undo from here')
            return;
        }
        const itemToUndo = undoStack[undoStack.length - 1];
        const { index, previousValue } = itemToUndo;
        setPuzzleData(prev => ({
            ...prev,
            grid: replaceCharAt(puzzleData.grid, index, previousValue)
        }))

        setUndoStack(prev => {
            prev.pop()
            return prev;
        });
        performValidityCheck(previousValue);
    }

    useEffect(() => {
        const handleMount = async () => {
            try {
                const url = `/get_random_existing_instance/${difficulty}/`;
                const { data } = await axiosReq.get(url);
                setPuzzleData(data);
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [difficulty])

    useEffect(() => {
        if (puzzleData.grid != null) {
            const emptyCells = puzzleData.grid.split('').filter(chr => chr !== '-');
            setCompleteness(emptyCells.length / 81 * 100);
        }
    }, [puzzleData])

    return (
        <Container>
            <Row className="d-flex justify-content-center mt-3">
                <p>Difficulty : {DIFFICULTY_LEVELS[difficulty]}</p>

            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <Puzzle
                    grid={puzzleData?.grid}
                    selectedCell={selectedCellIndex}
                    handleCellSelection={handleCellSelection}
                    warningGroup={warningGroup}
                    clashingCell={clashingCell}
                    completed={completeness === 100} />
            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <DigitChooser
                    activeDigits={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    handleDigitChoice={handleDigitChoice} />

            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <button
                    className={styles.icon_button}
                    onClick={deleteSelectedCell}>
                    <i className="fa-solid fa-eraser"></i>
                </button>
                <button
                    className={styles.icon_button}
                    onClick={handleUndo}>
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                </button>
            </Row>
            <Row className="mt-2">
                <Col md={{ span: 4, offset: 4 }} className="border">
                    <CompletenessDisplay
                        completenessPercentage={Math.round(completeness)}
                        shorthand />
                </Col>
            </Row>
            <div>Selected Cell: {selectedCellIndex}</div>
        </Container>
    )
}

export default PuzzleContainer