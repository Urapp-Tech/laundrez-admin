import { AuthTypes } from '../action-types/AuthTypes';


let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    user: {}
};

export function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthTypes.SIGNIN_PROG:
            return { ...state, isProgress: true };
        case AuthTypes.SIGNIN_SUCC: {
            let { id, username, firstName, lastName } = action.payload;
            return { ...state, isProgress: false, user: { id, username, firstName, lastName } };
        }
        case AuthTypes.SIGNIN_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case AuthTypes.CLEAR_ERROR:
            return { ...state, isError: false, errorText: '', errorStatus: 0 };
        default:
            return state;
    }
}