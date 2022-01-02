import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StoreProvider } from './app/context/StoreContext';

export const history = createBrowserHistory();


ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <StoreProvider>

                <App />

            </StoreProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

