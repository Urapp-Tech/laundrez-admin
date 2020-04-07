import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { FaqTypes } from '../action-types/FaqTypes';
import { toast } from 'react-toastify';
import { FaqActions } from '../actions/FaqActions';
const ErrorMsg = 'something went wrong !';

export class FaqEpics {
    static getFaqs(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(FaqTypes.GET_FAQS_PROG), switchMap(({ payload }) => {
            return ajaxGet(`/FAQ/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[question]=${payload.search}`).pipe(pluck('response'), map(obj => {
                return {
                    type: FaqTypes.GET_FAQS_SUCC,
                    payload: obj
                };
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: FaqTypes.GET_FAQS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }

    static addFaq(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(FaqTypes.ADD_FAQ_PROG), switchMap(({ payload }) => {
            return ajaxPost('/FAQ/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('faq added successfully');
                return of({
                    type: FaqTypes.ADD_FAQ_SUCC,
                    payload: obj
                },
                    FaqActions.toggleAddFaqModal(),
                    FaqActions.getFaqs()
                );
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: FaqTypes.ADD_FAQ_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
    static editFaq(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(FaqTypes.EDIT_FAQ_PROG), switchMap(({ payload }) => {
            return ajaxPut('/FAQ/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('faq edited successfully');
                return of({
                    type: FaqTypes.EDIT_FAQ_SUCC,
                    payload: obj
                },
                    FaqActions.toggleEditFaqModal(),
                    FaqActions.getFaqs(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: FaqTypes.EDIT_FAQ_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
    static delFaq(action$, state$, { ajaxDel }) {
        return action$.pipe(ofType(FaqTypes.DEL_FAQ_PROG), switchMap(({ payload }) => {
            return ajaxDel(`/FAQ/${payload.id}`).pipe(pluck('response'), flatMap(obj => {
                toast.success('faq deleted successfully');
                return of({
                    type: FaqTypes.DEL_FAQ_SUCC,
                    payload: obj
                },
                    FaqActions.toggleDelFaqModal(),
                    FaqActions.getFaqs(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: FaqTypes.DEL_FAQ_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
}