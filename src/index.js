import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.render(
    <Router>
        <ThemeProvider>
            <CurrentUserProvider>
                <App />
            </CurrentUserProvider>
        </ThemeProvider>

    </Router>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();