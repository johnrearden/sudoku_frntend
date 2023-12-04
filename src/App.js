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


function App() {

    //const currentUser = useCurrentUser();

    return (
        <div className={styles.App}>
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
                    <Route exact path="/signin" render={() => <SignInForm />} />
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route render={() => <NotFound />} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;