import NavBar from './components/NavBar';
import styles from "./App.module.css";
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { useCurrentUser } from './contexts/CurrentUserContext';
import NotFound from './components/NotFound';


function App() {

    const currentUser = useCurrentUser();

    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <>
                                Home Page
                            </>
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