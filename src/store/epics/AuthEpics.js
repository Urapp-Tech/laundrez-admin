import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map } from 'rxjs/operators';
import { AuthTypes } from '../action-types/AuthTypes';
import { StorageService } from '../services/StorageService';

export class AuthEpics {
    static signin(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthTypes.SIGNIN_PROG), switchMap(({ payload }) => {
            return ajaxPost('/User/signin/', payload.body).pipe(pluck('response'), map(obj => {
                let { id, username, firstName, lastName, role } = obj;
                if (role === 'Admin') {
                    let user = { id, username, firstName, lastName, role };
                    StorageService.setToken(obj?.token);
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
}