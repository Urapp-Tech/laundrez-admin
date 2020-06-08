import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { ServiceTypes } from '../action-types/ServiceTypes';
import { toast } from 'react-toastify';
import { ServiceActions } from '../actions/ServiceActions';
const ErrorMsg = 'something went wrong !';

export class ServiceEpics {
    static getServices(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(ServiceTypes.GET_SERVICES_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Service/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[title]=${payload.search}`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: ServiceTypes.GET_SERVICES_SUCC,
                    payload: obj
                };
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: ServiceTypes.GET_SERVICES_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static addService(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(ServiceTypes.ADD_SERVICE_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Service/', payload.body, null);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('service added successfully');
                if (payload?.history) {
                    payload.history.goBack();
                }
                return of({
                    type: ServiceTypes.ADD_SERVICE_SUCC,
                    payload: obj
                },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: ServiceTypes.ADD_SERVICE_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static editService(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(ServiceTypes.EDIT_SERVICE_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Service/', payload.body, null);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('service edited successfully');
                if (payload?.history) {
                    payload.history.goBack();
                }
                return of({
                    type: ServiceTypes.EDIT_SERVICE_SUCC,
                    payload: obj
                },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: ServiceTypes.EDIT_SERVICE_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static delService(action$, state$, { ajaxDel, getRefreshToken }) {
        return action$.pipe(ofType(ServiceTypes.DEL_SERVICE_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxDel(`/Service/${payload.id}`);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('service deleted successfully');
                return of({
                    type: ServiceTypes.DEL_SERVICE_SUCC,
                    payload: obj
                },
                    ServiceActions.getServices(state$.value.service.paging.pageNumber),
                    ServiceActions.toggleDelServiceModal()
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: ServiceTypes.DEL_SERVICE_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
}