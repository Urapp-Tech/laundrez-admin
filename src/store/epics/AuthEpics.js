import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, mergeMap } from 'rxjs/operators';
import { AuthTypes } from '../action-types/AuthTypes';
import { StorageService } from '../services/StorageService';

export class AuthEpics {
    static signin(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthTypes.SIGNIN_PROG), switchMap(({ payload }) => {
            return ajaxPost('/User/signin/', payload.body).pipe(pluck('response'), map(obj => {
                let { id, userName, firstName, lastName, role,token,refreshToken } = obj;
                if (role === 'Admin') {
                    let user = { id, userName, firstName, lastName, role };
                    StorageService.setToken(token);
                    StorageService.setRefreshToken(refreshToken);
                    StorageService.setUser(user);
                    return {
                        type: AuthTypes.SIGNIN_SUCC,
                        payload: { user }
                    };

                }
                else {
                    let err = new Error('You donot have sufficient rights');
                    throw err;
                }
            })
                , catchError((err) => {
                    return of({ type: AuthTypes.SIGNIN_FAIL, payload: { message: err?.response ? err?.response.message : err?.message, status: err?.status } });
                }));

        }));
    }
    static getNewAccessToken(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthTypes.GET_NEW_ACCESS_TOKEN_PROG), mergeMap(({ payload }) => {
            return ajaxPost('/user/refreshtoken', payload.body).pipe(pluck('response'), map((obj) => {
                StorageService.setToken(obj?.token);
                StorageService.setRefreshToken(obj?.refreshToken);
                return {
                    type: AuthTypes.GET_NEW_ACCESS_TOKEN_SUCC,

                };
            }), catchError(err => {
                return of({ type: AuthTypes.GET_NEW_ACCESS_TOKEN_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
            }));
        }));
    }
}