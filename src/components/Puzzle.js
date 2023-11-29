import React, { useState } from 'react'
import PuzzleCell from './PuzzleCell'
import styles from '../styles/Puzzle.module.css'
import { Row } from 'react-bootstrap'

const Puzzle = ({ grid, selectedCell, handleCellSelection }) => {

    const cells = grid?.split("").map((char, idx) => (
        <PuzzleCell
            key={idx}
            value={char}
            index={idx}
            selected={idx===selectedCell}
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