import {combineReducers} from 'redux';
import courses from './courseReducer.js';
import authors from './authorReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer.js';

const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCallsInProgress
});

export default rootReducer;
