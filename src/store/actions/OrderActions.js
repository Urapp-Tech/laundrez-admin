import { OrderTypes } from '../action-types/OrderTypes';


export class OrderActions {
    static getOrders(page = 1, pageSize = 10, search = '') {
        return {
            type: OrderTypes.GET_ORDERS_PROG,
            payload: { page, pageSize, search }
        };
    }
    static addOrder(body) {
        return {
            type: OrderTypes.ADD_CATEGORY_PROG,
            payload: { body }
        };
    }
    static editOrder(body) {
        return {
            type: OrderTypes.EDIT_CATEGORY_PROG,
            payload: { body }
        };
    }
    static delOrder(id) {
        return {
            type: OrderTypes.DEL_CATEGORY_PROG,
            payload: { id }
        };
    }
    static toggleAddOrderModal() {
        return {
            type: OrderTypes.TOGGLE_ADD_CATEGORY_MODAL
        };
    }
    static toggleEditOrderModal(index = -1) {
        return {
            type: OrderTypes.TOGGLE_EDIT_CATEGORY_MODAL,
            payload: { index }
        };
    }
    static toggleDelOrderModal(index = -1) {
        return {
            type: OrderTypes.TOGGLE_DEL_CATEGORY_MODAL,
            payload: { index }
        };
    }
    // static clearOrder() {
    //     return {
    //         type: OrderTypes.CLEAR_CATEGORY
    //     };
    // }
}