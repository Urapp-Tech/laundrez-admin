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

    static addCateogry(action$, state$, { ajaxPost, API_URL }) {
        return action$.pipe(ofType(CategoryTypes.ADD_CATEGORY_PROG), switchMap(({ payload }) => {
            return ajaxPost(`${API_URL}/Category/`, payload.body).pipe(pluck('response'), map(obj => {
                return {
                    type: CategoryTypes.ADD_CATEGORY_SUCC,
                    payload: obj
                };
            })
                , catchError((err) => {
                    return of({ type: CategoryTypes.ADD_CATEGORY_FAIL, payload: { message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}