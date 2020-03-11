import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map } from 'rxjs/operators';

import { CategoryTypes } from '../action-types/CategoryTypes';

export class CategoryEpics {
    static getCategories(action$, state$, { ajaxGet, API_URL }) {
        return action$.pipe(ofType(CategoryTypes.GET_CATEGORIES_PROG), switchMap(({ payload }) => {
            return ajaxGet(`${API_URL}/Category/all?page[number]=${payload?.page}`).pipe(pluck('response'), map(obj => {
                return {
                    type: CategoryTypes.GET_CATEGORIES_SUCC,
                    payload: obj
                };
            })
                , catchError((err) => {
                    return of({ type: CategoryTypes.GET_CATEGORIES_FAIL, payload: err });
                }));

        }));
    }
}