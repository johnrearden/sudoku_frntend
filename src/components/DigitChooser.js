import React from 'react'
import styles from '../styles/DigitChooser.module.css'

const DigitChooser = (props) => {

    const { activeDigits, handleDigitChoice } = props;

    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const buttons = digits.map(digit => (
        <div
            className={styles.Digit}
            key={digit}
            onClick={() => handleDigitChoice(digit)}
        >
            {digit}
        </div>
    ))

    return (
        <>
            {buttons}
        </>

    )
}

export default DigitChooser