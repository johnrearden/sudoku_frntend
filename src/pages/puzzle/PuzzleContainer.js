import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { DIFFICULTY_LEVELS } from '../../constants/constants';
import Puzzle from '../../components/Puzzle';
import { axiosReq } from '../../api/axiosDefaults';
import { Button, Row } from 'react-bootstrap';
import DigitChooser from '../../components/DigitChooser';
import { checkCellValidity, replaceCharAt } from '../../utils/utils';


const PuzzleContainer = () => {

    const { difficulty } = useParams();
    const [puzzleData, setPuzzleData] = useState({});
    
    // Current cell selected by user.
    const [selectedCellIndex, setSelectedCellIndex] = useState(0);

    // The row, col or square in which a digit appears twice
    const [warningGroup, setWarningGroup] = useState([]);

    // The cell that duplicated the value of the current selected cell.
    const [clashingCell, setClashingCell] = useState(-1);

    
    const [undoStack, setUndoStack] = useState([]);

    const handleDigitChoice = (digit) => {

        const currentSelectedCellValue = puzzleData.grid[selectedCellIndex];

        const { isValid, clashingCell, group } = checkCellValidity(
            puzzleData.grid, selectedCellIndex, digit);

        if (!isValid) {
            setWarningGroup(group);
            setClashingCell(clashingCell);
        }

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
            console.log(prev);
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
            console.log('Cant undo ... nothing in the stack.')
            return;
        }
        const itemToUndo = undoStack[undoStack.length - 1];
        console.log(`item to undo : ${itemToUndo}`)
        const {index, previousValue} = itemToUndo;
        setPuzzleData(prev => ({
            ...prev,
            grid: replaceCharAt(puzzleData.grid, index, previousValue)
        }))
        setUndoStack(prev => {
            prev.pop()
            return prev;
        });
    }

    useEffect(() => {
        const handleMount = async () => {
            try {
                const url = `/get_random_existing_instance/${difficulty}/`;
                const { data } = await axiosReq.get(url);
                console.log(data);
                setPuzzleData(data);
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [])

    console.log(undoStack);

    return (
        <>
            <Row className="d-flex justify-content-center mt-3">
                <p>Difficulty : {DIFFICULTY_LEVELS[difficulty]}</p>

            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <Puzzle
                    grid={puzzleData?.grid}
                    selectedCell={selectedCellIndex}
                    handleCellSelection={handleCellSelection}
                    warningGroup={warningGroup}
                    clashingCell={clashingCell} />
            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <DigitChooser
                    activeDigits={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    handleDigitChoice={handleDigitChoice} />

            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <Button
                    className="btn btn-danger rounded mx-1"
                    onClick={deleteSelectedCell}>
                    <i class="fa-solid fa-eraser"></i>
                </Button>
                <Button
                    className="btn btn-warning rounded mx-1"
                    onClick={handleUndo}>
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                </Button>
            </Row>
            Selected Cell: {selectedCellIndex}
        </>
    )
}

export default PuzzleContainer