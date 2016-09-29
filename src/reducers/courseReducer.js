import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

        case types.CREATE_COURSE:
            // this is something like Ext.Apply()
            return [...state,
                    Object.assign({}, action.course)];

        default:
            return state;
    }
}
