import React, { useEffect, useState } from 'react'
import ChooseDifficulty from './ChooseDifficulty'
import { LCLSTRG_KEY } from '../../constants/constants'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import styles from '../../styles/NavBar.module.css';
import { Row } from 'react-bootstrap';

const Home = () => {

    const [prevPuzzle, setPrevPuzzle] = useState({});

    useEffect(() => {
        const previousPuzzle = window.localStorage.getItem(LCLSTRG_KEY);
        if (previousPuzzle) {
            const puzzleData = JSON.parse(previousPuzzle);
            setPrevPuzzle(puzzleData);
        }
    }, []);

    return (
        <>
            <div><h1 className="text-center mt-5">Sudoku<small className="text-muted"> (demo)</small></h1></div>
            <ChooseDifficulty />

            <Row className="justify-content-center mt-5">
                {prevPuzzle && (
                    <NavLink
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to={`/get_puzzle/${prevPuzzle.difficulty}`}>
                        <span>Or return to your previous puzzle</span>
                        <i className="fa-solid fa-arrow-rotate-left ml-1"></i>                    </NavLink>
                )}
            </Row>


        </>

    )
}

export default Home