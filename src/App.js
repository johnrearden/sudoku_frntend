import NavBar from './components/NavBar';
import styles from "./App.module.css";
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import NotFound from './components/NotFound';
import Home from './pages/puzzle/Home';
import PuzzleContainer from './pages/puzzle/PuzzleContainer';
import ProfilePage from './pages/profile/ProfilePage';
import { useTheme } from './contexts/ThemeContext';

import themes from './styles/Themes.module.css';
import Leaderboard from './pages/puzzle/Leaderboard';


function App() {

    const theme = useTheme();
    const themeStyles = theme === 'light' ? themes.lightTheme : themes.darkTheme;

    return (
        <div className={`${themeStyles} ${styles.App}`}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route
                        exact
                        path="/get_puzzle/:difficulty"
                        render={() => (
                            <PuzzleContainer />
                        )} />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Home />
                        )} />
                    <Route exact path="/leaderboard/:id" render={() => <Leaderboard />}/>
                    <Route exact path="/profile/:id" render={() => <ProfilePage />}/>
                    <Route exact path="/signin" render={() => <SignInForm />} />
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route render={() => <NotFound />} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;