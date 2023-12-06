import React, { useState } from 'react'
import { Navbar, Nav, Container} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import btnStyles from "../styles/Button.module.css";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { useSetTheme, useTheme } from '../contexts/ThemeContext';


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const theme = useTheme();
    const setTheme = useSetTheme();

    const [isChecked, setIsChecked] = useState(theme === 'light');

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        setIsChecked(!isChecked);
    }

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignout = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    }

    const loggedOutIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signin">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span>Login</span>
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup">
                <i className="fa-regular fa-user"></i><span>Sign Up</span>
            </NavLink>
        </>
    );

    const loggedInIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to={`/profile/${currentUser?.profile_id}`}>
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
            </NavLink>
            <NavLink
                className={styles.NavLink}
                to="/"
                onClick={() => {
                    handleSignout();
                }}>
                <i className="fa-solid fa-person-walking-arrow-right"></i>
                <span>Logout</span>
            </NavLink>
        </>)

    return (
        <Navbar expanded={expanded} className={styles.NavBar} fixed="top" expand="md">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <h2 className={styles.FreckleFaceFont}>Sudoku</h2>
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    ref={ref}
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        
                        {/* Button to toggle light/dark theme */}
                        <button
                            aria-label="theme-toggle-button"
                            className={`${btnStyles.Button}`}
                            onClick={handleThemeToggle}
                        >
                            {theme === 'light' ? (
                                <i className="fa-solid fa-moon"></i>
                            ) : (
                                <i className="fa-solid fa-sun"></i>
                            )}
                        </button>

                        {currentUser ? loggedInIcons : loggedOutIcons}

                        <NavLink exact
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/">
                            <div className='d-flex align-items-center'>
                                <i className="fa-solid fa-house"></i>
                                <span>Home</span>
                            </div>

                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar >

    )
}

export default NavBar