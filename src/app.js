import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);
const appRoot = document.getElementById('app');

ReactDOM.render(<p className="loader">Loading your expenses…</p>, appRoot);

store.dispatch(startSetExpenses())
    .then(() => {
        ReactDOM.render(jsx, appRoot);
    })
    .catch((e) => {
        ReactDOM.render(
            <div className="content-container">
                <div className="message-box">
                    <h2>Couldn't load your expenses</h2>
                    <p>{e.message}. Make sure the API server is running, then try again.</p>
                    <button className="button" onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>,
            appRoot
        );
    });
