import { AuthTypes } from '../action-types/AuthTypes';

export class AuthActions {
    static signin(body) {
        return {
            type: AuthTypes.SIGNIN_PROG,
            payload: { body }
        };
    }
    static clearError() {
        return {
            type: AuthTypes.CLEAR_ERROR,
        };
    }
}