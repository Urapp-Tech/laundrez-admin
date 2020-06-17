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
                let url = `/Order/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[status]=${payload.status}&filters[orderNumber%2BdeliveryAddress%2BfirstName%2BlastName%2Bemail]=${payload.search}&sort=-orderDate`;
                if (payload.orderDate) {
                    let dateFilter = `&filters[>%3DpickupDate]=${payload.orderDate['startDate']}&filters[<%3DpickupDate]=${payload.orderDate['endDate']}`;
                    url = url.concat(dateFilter);
                }
                return ajaxGet(url);
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


    static getCSVData(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_CSV_DATA_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Order/all?page[number]=1&page[size]=5000&filters[status]=${payload.status}&sort=-orderDate`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: OrderTypes.GET_CSV_DATA_SUCC,
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
                        return of({ type: OrderTypes.GET_CSV_DATA_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
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

    static updateOrderStatus(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.UPDATE_ORDER_STATUS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Order/status', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('status updated successfully');
                return of({
                    type: OrderTypes.UPDATE_ORDER_STATUS_SUCC,
                    payload: obj
                },
                    OrderActions.toggleStatusModal(),
                    OrderActions.getOrders(state$?.value?.order?.paging?.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: OrderTypes.UPDATE_ORDER_STATUS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }


    static editOrder(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.EDIT_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Order/', payload.body);
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
                        message = err?.response?.Message;
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