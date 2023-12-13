import React from 'react'
import { Button, Row } from 'react-bootstrap'
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/ChooseDifficulty.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { LCLSTRG_KEY } from '../../constants/constants'


const ChooseDifficulty = ({ message, fadeIn }) => {

    const history = useHistory();

    const handleClick = (event) => {
        const difficulty = event.target.getAttribute("data-difficulty");

        // Remove any stored puzzle from localStorage - keep things simple -
        // Selecting a new puzzle destroys the old one, if present
        window.localStorage.removeItem(LCLSTRG_KEY);

        history.push(`/get_puzzle/${difficulty}`)
    }

    return (
        <div className={fadeIn && styles.FadeIn}>
            <Row className="d-flex justify-content-center text-center mt-5">
                <h5>{message || 'Choose Difficulty Level'} </h5>
            </Row>

            <Row className="d-flex justify-content-center mt-2">
                <Button
                    onClick={handleClick}
                    data-difficulty="0"
                    className={`mx-2 ${btnStyles.Button}`}
                >Easy</Button>
                <Button
                    onClick={handleClick}
                    data-difficulty="1"
                    className={`mx-2 ${btnStyles.Button}`}
                >Medium</Button>
                <Button
                    onClick={handleClick}
                    data-difficulty="2"
                    className={`mx-2 ${btnStyles.Button}`}
                >Hard</Button>
                <Button
                    onClick={handleClick}
                    data-difficulty="3"
                    className={`mx-2 ${btnStyles.Button}`}
                >Vicious</Button>
            </Row>
        </div>
    )
}

export default ChooseDifficulty