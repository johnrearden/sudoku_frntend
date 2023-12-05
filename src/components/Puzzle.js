import React from 'react'
import PuzzleCell from './PuzzleCell'
import styles from '../styles/Puzzle.module.css'
import { Row } from 'react-bootstrap'

const Puzzle = ({ 
    grid, 
    selectedCell, 
    handleCellSelection, 
    warningGroup, 
    clashingCell,
    completed }) => {

    const cells = grid?.split("").map((char, idx) => (
        <PuzzleCell
            key={idx}
            value={char}
            index={idx}
            selected={idx===selectedCell}
            warning={warningGroup.includes(idx)}
            illegal={idx===clashingCell}
            correct={completed}
            handleSelection={handleCellSelection}/>
    ))

    return (
        <>
            <Row>
                <div className={styles.Grid}>{cells}</div>
            </Row>

        </>

    )
}

export default Puzzle