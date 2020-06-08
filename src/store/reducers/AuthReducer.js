import { AuthTypes } from '../action-types/AuthTypes';


let INITIAL_STATE = {
    isProgress: false,
    isProgressRefreshToken: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    user: {}
};

export function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthTypes.SIGNIN_PROG:
            return { ...state, isProgress: true };

        case AuthTypes.SIGNIN_SUCC:
            return { ...state, isProgress: false, user: action.payload.user };

        case AuthTypes.SIGNIN_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

    
        case AuthTypes.GET_NEW_ACCESS_TOKEN_PROG:
            return { ...state, isProgressRefreshToken: true };

        case AuthTypes.GET_NEW_ACCESS_TOKEN_SUCC:
            return { ...state, isProgressRefreshToken: false, };

        case AuthTypes.GET_NEW_ACCESS_TOKEN_FAIL:
            return { ...state, isProgressRefreshToken: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

        case AuthTypes.SET_USER:
            return { ...state, user: action.payload.user };

        case AuthTypes.CLEAR_ERROR:
            return { ...state, isError: false, errorText: '', errorStatus: 0 };
        default:
            return state;
    }
}