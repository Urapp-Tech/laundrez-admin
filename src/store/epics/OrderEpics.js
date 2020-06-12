import { of, defer, iif } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { OrderTypes } from '../action-types/OrderTypes';
import { toast } from 'react-toastify';
import { OrderActions } from '../actions/OrderActions';
const ErrorMsg = 'something went wrong !';

export class OrderEpics {
    static getOrders(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_ORDERS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Order/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[status]=${payload.status}&filters[orderdate]=${payload.orderDate}&filters[orderNumber]=${payload.search}&sort=-orderDate`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: OrderTypes.GET_ORDERS_SUCC,
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
                        return of({ type: OrderTypes.GET_ORDERS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }


    static getOrder(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Order/${payload.orderId}`);
            }).pipe(pluck('response'), flatMap(obj => {
                return iif(
                    () => payload?.openPdf,
                    of(
                        {
                            type: OrderTypes.GET_ORDER_SUCC,
                            payload: obj
                        },
                        OrderActions.togglePdfOrderModal()
                    ),
                    of(
                        {
                            type: OrderTypes.GET_ORDER_SUCC,
                            payload: obj
                        },
                        OrderActions.toggleEditOrderModal()
                    )
                );

            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: OrderTypes.GET_ORDER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    // static addCateogry(action$, state$, { ajaxPost, getRefreshToken }) {
    //     return action$.pipe(ofType(OrderTypes.ADD_CATEGORY_PROG), switchMap(({ payload }) => {
    //         return defer(() => {
    //             return ajaxPost('/Order/', payload.body, null);
    //         }).pipe(pluck('response'), flatMap(obj => {
    //             toast.success('category added successfully');
    //             return of({
    //                 type: OrderTypes.ADD_CATEGORY_SUCC,
    //                 payload: obj
    //             },
    //                 OrderActions.toggleAddOrderModal(),
    //                 OrderActions.getCategories()
    //             );
    //         })
    //             , catchError((err, source) => {
    //                 if (err.status === 401) {
    //                     return getRefreshToken(action$, state$, source);
    //                 }
    //                 else {
    //                     let message;
    //                     if (err.status === 500)
    //                         message = err?.response?.Message;
    //                     else if (err.status === 400)
    //                         message = err?.response?.errors[0]?.message;
    //                     toast.error(message ? message : ErrorMsg);
    //                     return of({ type: OrderTypes.ADD_CATEGORY_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
    //                 }
    //             }));

    //     }));
    // }
    static editOrder(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.EDIT_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Order/', payload.body, null);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('Order updated successfully');
                return of({
                    type: OrderTypes.EDIT_ORDER_SUCC,
                    payload: obj
                },
                    OrderActions.toggleEditOrderModal(),
                    OrderActions.getOrders(state$?.value?.category?.paging?.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message;
                        if (err.status === 500)
                            message = err?.response?.Message;
                        else if (err.status === 400)
                            message = err?.response?.errors[0]?.message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: OrderTypes.EDIT_ORDER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    // static delCateogry(action$, state$, { ajaxDel, getRefreshToken }) {
    //     return action$.pipe(ofType(OrderTypes.DEL_CATEGORY_PROG), switchMap(({ payload }) => {
    //         return defer(() => {
    //             return ajaxDel(`/Order/${payload.id}`);
    //         }).pipe(pluck('response'), flatMap(obj => {
    //             toast.success('category deleted successfully');
    //             return of({
    //                 type: OrderTypes.DEL_CATEGORY_SUCC,
    //                 payload: obj
    //             },
    //                 OrderActions.toggleDelOrderModal(),
    //                 OrderActions.getCategories(state$.value.category.paging.pageNumber)
    //             );
    //         })
    //             , catchError((err, source) => {
    //                 if (err.status === 401) {
    //                     return getRefreshToken(action$, state$, source);
    //                 }
    //                 else {
    //                     let message = err?.response?.Message;
    //                     toast.error(message ? message : ErrorMsg);
    //                     return of({ type: OrderTypes.DEL_CATEGORY_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
    //                 }
    //             }));

    //     }));
    // }
}