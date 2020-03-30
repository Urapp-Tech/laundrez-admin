import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { ServiceTypes } from '../action-types/ServiceTypes';
import { toast } from 'react-toastify';
import { ServiceActions } from '../actions/ServiceActions';
const ErrorMsg = 'something went wrong !';

export class ServiceEpics {
    static getServices(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(ServiceTypes.GET_SERVICES_PROG), switchMap(({ payload }) => {
            return ajaxGet(`/Service/all?page[number]=${payload?.page}`).pipe(pluck('response'), map(obj => {
                return {
                    type: ServiceTypes.GET_SERVICES_SUCC,
                    payload: obj
                };
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: ServiceTypes.GET_SERVICES_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }

    static addService(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(ServiceTypes.ADD_SERVICE_PROG), switchMap(({ payload }) => {
            return ajaxPost('/Service/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('category added successfully');
                return of({
                    type: ServiceTypes.ADD_SERVICE_SUCC,
                    payload: obj
                },
                    ServiceActions.getServices()
                );
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: ServiceTypes.ADD_SERVICE_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
    static editService(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(ServiceTypes.EDIT_SERVICE_PROG), switchMap(({ payload }) => {
            return ajaxPut('/Service/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('category edited successfully');
                return of({
                    type: ServiceTypes.EDIT_SERVICE_SUCC,
                    payload: obj
                },
                    ServiceActions.getServices(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: ServiceTypes.EDIT_SERVICE_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
    static delService(action$, state$, { ajaxDel }) {
        return action$.pipe(ofType(ServiceTypes.DEL_SERVICE_PROG), switchMap(({ payload }) => {
            return ajaxDel(`/Service/${payload.id}`).pipe(pluck('response'), flatMap(obj => {
                toast.success('category deleted successfully');
                return of({
                    type: ServiceTypes.DEL_SERVICE_SUCC,
                    payload: obj
                },
                    ServiceActions.getServices(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: ServiceTypes.DEL_SERVICE_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
}