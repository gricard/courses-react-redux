/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import {callLoadCourses} from './actions/courseActions';
import {callLoadAuthors} from './actions/authorActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();

// call THUNKS to get data from API
store.dispatch(callLoadCourses());
store.dispatch(callLoadAuthors());

// REDUX - Provider connects entire app to redux store
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
