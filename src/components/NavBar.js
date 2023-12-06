import React, { useState } from 'react'
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { useSetTheme, useTheme } from '../contexts/ThemeContext';


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const theme = useTheme();
    const setTheme = useSetTheme();
    console.log(theme);

    const [isChecked, setIsChecked] = useState(theme === 'light');

    const handleToggle = () => {
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
                <span>Sign Out</span>
            </NavLink>
        </>)

    return (
        <Navbar expanded={expanded} className={styles.NavBar} fixed="top" expand="md">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <h4>Sudoku</h4>
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    ref={ref}
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">

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
                        <Form>
                            <Form.Check
                                type="switch"
                                id="toggle-switch"
                                label="Toggle"
                                checked={isChecked}
                                onChange={handleToggle}
                            />
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar>

    )
}

export default NavBar