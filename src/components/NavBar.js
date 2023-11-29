import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';







const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

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
                <i class="fa-solid fa-arrow-right-to-bracket"></i>Login
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup">
                <i class="fa-regular fa-user"></i>Sign Up
            </NavLink>
        </>
    );

    const loggedInIcons = (
        <>
            {/* <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/feed">
                <i className="fas fa-stream"></i>Feed
            </NavLink> */}
            <NavLink
                className={styles.NavLink}
                to="/"
                onClick={() => {
                    handleSignout();
                }}>
                <i class="fa-solid fa-person-walking-arrow-right"></i>Sign Out
            </NavLink>
            {/* <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to={`/profiles/${currentUser?.profile_id}`}
                >
                <Avatar 
                    src={currentUser?.profile_image}
                    text="Profile"
                    height={40} />
            </NavLink>  */}
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
                            <i class="fa-solid fa-house"></i>Home
                            </div>

                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar>

    )
}

export default NavBar