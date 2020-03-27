import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { CategoryTypes } from '../action-types/CategoryTypes';
import { toast } from 'react-toastify';
import { CategoryActions } from '../actions/CategoryActions';

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
            return ajaxPost('/Category/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('category added successfully');
                return of({
                    type: CategoryTypes.ADD_CATEGORY_SUCC,
                    payload: obj
                },
                    CategoryActions.toggleAddCategoryModal(),
                    CategoryActions.getCategories()
                );
            })
                , catchError((err) => {
                    toast.error(err?.response?.message);
                    return of({ type: CategoryTypes.ADD_CATEGORY_FAIL, payload: { message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
    static editCateogry(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(CategoryTypes.EDIT_CATEGORY_PROG), switchMap(({ payload }) => {
            return ajaxPut('/Category/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('category edited successfully');
                return of({
                    type: CategoryTypes.EDIT_CATEGORY_SUCC,
                    payload: obj
                },
                    CategoryActions.toggleEditCategoryModal(),
                    CategoryActions.getCategories(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err) => {
                    toast.error(err.message);
                    return of({ type: CategoryTypes.EDIT_CATEGORY_FAIL, payload: { message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}