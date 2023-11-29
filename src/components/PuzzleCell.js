import React from 'react'
import styles from '../styles/PuzzleCell.module.css'

const PuzzleCell = (props) => {

    const { 
        value, 
        index, 
        selected, 
        warning,
        illegal, 
        handleSelection } = props;

    const isDigit = (string) => {
        return string >= "0" && string <= "9";
    }
    
    const selectedClass = selected ? styles.Selected : '';
    const warningClass = warning ? styles.Warning : '';
    const clashing = illegal ? styles.Clashing_Cell : '';
    const offending = selected && warning ? styles.Offending_Choice : '';

    const className = [styles.Cell, selectedClass, warningClass, clashing, offending].join(' ');

    return (
        <div 
            className={className}
            onClick={() => handleSelection(index)}
        >
            {isDigit(value) ? value : ""}
            </div>
    )
}

export default PuzzleCell