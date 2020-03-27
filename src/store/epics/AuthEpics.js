import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map } from 'rxjs/operators';
import { AuthTypes } from '../action-types/AuthTypes';
import { StorageService } from '../services/StorageService';

export class AuthEpics {
    static signin(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthTypes.SIGNIN_PROG), switchMap(({ payload }) => {
            return ajaxPost('/User/signin/', payload.body).pipe(pluck('response'), map(obj => {
                StorageService.setToken(obj?.token);
                let { id, username, firstName, lastName } = obj;
                let user = { id, username, firstName, lastName };
                StorageService.setUser(user);
                return {
                    type: AuthTypes.SIGNIN_SUCC,
                    payload: { user }
                };
            })
                , catchError((err) => {
                    return of({ type: AuthTypes.SIGNIN_FAIL, payload: { message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}