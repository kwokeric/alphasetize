import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './redux/store';

import './index.css';
import AppTemplate from './components/AppTemplate';
import About from './components/About';
import Search from './components/Search';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <AppTemplate>
                <Route exact path="/" component={About} />
                <Route path="/About" component={About} />
                <Route path="/search" component={Search} />
            </AppTemplate>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
