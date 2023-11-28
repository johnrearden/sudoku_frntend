import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

import { MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { SlHome } from "react-icons/sl";






const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

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
                <MdOutlineLogin />
                <span>Sign In</span>
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup">
                <FaRegUser /><span>Sign Up</span>
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
                <i className="fas fa-sign-out-alt"></i>Sign Out
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
                        <img src={logo} alt="logo" height="45"></img>
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
                            <SlHome/>
                            <span>Home</span>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar>

    )
}

export default NavBar