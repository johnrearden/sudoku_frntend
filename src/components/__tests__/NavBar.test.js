import { render, screen, fireEvent, renderHook } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom"
import { createMemoryHistory } from "history";

import NavBar from '../NavBar';
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";

test('renders NavBar', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    // screen.debug();

    const signInLink = screen.getByRole('link', { name: 'Login' });
    expect(signInLink).toBeInTheDocument();
})

test('renders link to profile if signed in', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const profileLink = await screen.findByText('Profile');
    expect(profileLink).toBeInTheDocument();
})

test('renders login and logout buttons again on signout', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole('link', { name: 'Logout' });
    fireEvent.click(signOutLink);
    const loginLink = await screen.findByRole('link', { name: 'Login' });

    expect(loginLink).toBeInTheDocument();
})

test('displays theme toggle button', () => {
    render(
        <Router>
            <ThemeProvider>
                <NavBar />
            </ThemeProvider>
        </Router>
    );

    const themeToggleBtn = screen.getByRole('button', {name: "theme-toggle-button"});

    expect(themeToggleBtn).toBeInTheDocument();
})

