import React from 'react'
import styles from '../styles/PuzzleCell.module.css'

const PuzzleCell = (props) => {

    const { value, index, selected, handleSelection } = props;

    const isDigit = (string) => {
        return string >= "0" && string <= "9";
    }
    
    const selectedClass = selected ? styles.Selected : '';

    return (
        <div 
            className={`${styles.Cell} ${selectedClass}`}
            onClick={() => handleSelection(index)}
        >
            {isDigit(value) ? value : ""}
            </div>
    )
}

export default PuzzleCell