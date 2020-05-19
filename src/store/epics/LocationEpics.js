import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { LocationTypes } from '../action-types/LocationTypes';
import { toast } from 'react-toastify';
import { LocationActions } from '../actions/LocationActions';
const ErrorMsg = 'something went wrong !';

export class LocationEpics {
    static getLocations(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(LocationTypes.GET_LOCATIONS_PROG), switchMap(({ payload }) => {
            return ajaxGet(`/Location/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[name]=${payload.search}`).pipe(pluck('response'), map(obj => {
                return {
                    type: LocationTypes.GET_LOCATIONS_SUCC,
                    payload: obj
                };
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: LocationTypes.GET_LOCATIONS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }

    static addLocation(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(LocationTypes.ADD_LOCATION_PROG), switchMap(({ payload }) => {
            return ajaxPost('/Location/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('location added successfully');
                return of({
                    type: LocationTypes.ADD_LOCATION_SUCC,
                    payload: obj
                },
                    LocationActions.toggleAddLocationModal(),
                    LocationActions.getLocations()
                );
            })
                , catchError((err) => {
                    let message;
                    if (err.status === 500)
                        message = err?.response?.Message;
                    else if (err.status === 400)
                        message = err?.response?.errors[0]?.message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: LocationTypes.ADD_LOCATION_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
    static editLocation(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(LocationTypes.EDIT_LOCATION_PROG), switchMap(({ payload }) => {
            return ajaxPut('/Location/', payload.body).pipe(pluck('response'), flatMap(obj => {
                toast.success('location edited successfully');
                return of({
                    type: LocationTypes.EDIT_LOCATION_SUCC,
                    payload: obj
                },
                    LocationActions.toggleEditLocationModal(),
                    LocationActions.getLocations(state$.value.location.paging.pageNumber)
                );
            })
                , catchError((err) => {
                    let message;
                    if (err.status === 500)
                        message = err?.response?.Message;
                    else if (err.status === 400)
                        message = err?.response?.errors[0]?.message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: LocationTypes.EDIT_LOCATION_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
    static delLocation(action$, state$, { ajaxDel }) {
        return action$.pipe(ofType(LocationTypes.DEL_LOCATION_PROG), switchMap(({ payload }) => {
            return ajaxDel(`/Location/${payload.id}`).pipe(pluck('response'), flatMap(obj => {
                toast.success('location deleted successfully');
                return of({
                    type: LocationTypes.DEL_LOCATION_SUCC,
                    payload: obj
                },
                    LocationActions.toggleDelLocationModal(),
                    LocationActions.getLocations(state$.value.location.paging.pageNumber)
                );
            })
                , catchError((err) => {
                    let message = err?.response?.Message;
                    toast.error(message ? message : ErrorMsg);
                    return of({ type: LocationTypes.DEL_LOCATION_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                }));

        }));
    }
}