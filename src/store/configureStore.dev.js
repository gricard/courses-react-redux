import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

// REDUX state storage
// single store for all data
export default function configureStore(initialState) {
    // register all reducers with the store
    return createStore(
        rootReducer,
        initialState,
        // THUNK
        applyMiddleware(thunk, reduxImmutableStateInvariant())
    );
}
