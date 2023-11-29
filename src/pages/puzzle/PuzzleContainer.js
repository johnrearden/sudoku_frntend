import React, { isValidElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { DIFFICULTY_LEVELS } from '../../constants/constants';
import Puzzle from '../../components/Puzzle';
import { axiosReq } from '../../api/axiosDefaults';
import { Row } from 'react-bootstrap';
import DigitChooser from '../../components/DigitChooser';
import { checkCellValidity } from '../../utils/utils';

const PuzzleContainer = () => {

    const { difficulty } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCellIndex, setSelectedCellIndex] = useState(0);

    const [puzzleData, setPuzzleData] = useState({});

    const handleDigitChoice = (digit) => {

        const {isValid, clashingCell} = checkCellValidity(
            puzzleData.grid, selectedCellIndex, digit);
        console.log(isValid + ' (' + clashingCell + ')')

        setPuzzleData(prevData => {
            const index = selectedCellIndex;
            const grid = prevData.grid;
            const newString = grid.substring(0, index) + digit.toString() + grid.substring(index + 1, grid.length);

            return {
                ...prevData,
                grid: newString,
            }
        })
    }

    const handleCellSelection = (index) => {
        setSelectedCellIndex(index);
    }

    useEffect(() => {
        const handleMount = async () => {
            try {
                const url = `/get_random_existing_instance/${difficulty}/`;
                const { data } = await axiosReq.get(url);
                console.log(data);
                setPuzzleData(data);
                setIsLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [])

    console.log(puzzleData);

    return (
        <>
            <Row className="d-flex justify-content-center mt-3">
                <p>Difficulty : {DIFFICULTY_LEVELS[difficulty]}</p>

            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <Puzzle 
                    grid={puzzleData?.grid}
                    selectedCell={selectedCellIndex}
                    handleCellSelection={handleCellSelection} />
            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <DigitChooser 
                    activeDigits={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    handleDigitChoice={handleDigitChoice}/>

            </Row>
            Selected Cell: {selectedCellIndex}
        </>
    )
}

export default PuzzleContainer