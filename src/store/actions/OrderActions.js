import { OrderTypes } from '../action-types/OrderTypes';


export class OrderActions {
    static getOrders(page = 1, pageSize = 10, search = '', status = '', orderDate = '') {
        return {
            type: OrderTypes.GET_ORDERS_PROG,
            payload: { page, pageSize, search, status, orderDate }
        };
    }

    static getOrder(orderId, openPdf) {
        return {
            type: OrderTypes.GET_ORDER_PROG,
            payload: { orderId, openPdf }
        };
    }


    static addOrder(body) {
        return {
            type: OrderTypes.ADD_ORDER_PROG,
            payload: { body }
        };
    }
    static editOrder(body) {
        return {
            type: OrderTypes.EDIT_ORDER_PROG,
            payload: { body }
        };
    }
    static delOrder(id) {
        return {
            type: OrderTypes.DEL_ORDER_PROG,
            payload: { id }
        };
    }
    static toggleAddOrderModal() {
        return {
            type: OrderTypes.TOGGLE_ADD_ORDER_MODAL
        };
    }
    static toggleEditOrderModal() {
        return {
            type: OrderTypes.TOGGLE_EDIT_ORDER_MODAL
        };
    }
    static toggleDelOrderModal(index = -1) {
        return {
            type: OrderTypes.TOGGLE_DEL_ORDER_MODAL,
            payload: { index }
        };
    }
    static togglePdfOrderModal() {
        return {
            type: OrderTypes.TOGGLE_PDF_ORDER_MODAL,
        };
    }
    static toggleStatusModal() {
        return {
            type: OrderTypes.TOGGLE_STATUS_CONFIRMATION_MODAL
        };
    }
    // static clearOrder() {
    //     return {
    //         type: OrderTypes.CLEAR_ORDER
    //     };
    // }
}