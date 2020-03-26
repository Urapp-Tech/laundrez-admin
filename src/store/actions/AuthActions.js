import { AuthTypes } from '../action-types/AuthTypes';

export class AuthActions {
    static signin(body) {
        return {
            type: AuthTypes.SIGNIN_PROG,
            payload: { body }
        };
    }
    static setUser(user) {
        return {
            type: AuthTypes.SET_USER,
            payload: { user }
        };
    }
    static clearError() {
        return {
            type: AuthTypes.CLEAR_ERROR,
        };
    }
    static signout() {
        return {
            type: AuthTypes.SIGNOUT_USER
        };
    }
}