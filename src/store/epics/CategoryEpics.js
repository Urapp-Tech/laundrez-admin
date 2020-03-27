import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map } from 'rxjs/operators';

import { CategoryTypes } from '../action-types/CategoryTypes';
import { toast } from 'react-toastify';

export class CategoryEpics {
    static getCategories(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(CategoryTypes.GET_CATEGORIES_PROG), switchMap(({ payload }) => {
            return ajaxGet(`/Category/all?page[number]=${payload?.page}`).pipe(pluck('response'), map(obj => {
                return {
                    type: CategoryTypes.GET_CATEGORIES_SUCC,
                    payload: obj
                };
            })
                , catchError((err) => {
                    toast.error(err?.response?.message);
                    return of({ type: CategoryTypes.GET_CATEGORIES_FAIL, payload: err });
                }));

        }));
    }

    static addCateogry(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(CategoryTypes.ADD_CATEGORY_PROG), switchMap(({ payload }) => {
            return ajaxPost('/Category/', payload.body).pipe(pluck('response'), map(obj => {
                toast.success('category added successfully');
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