import { OrderTypes } from '../action-types/OrderTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isProgressEdit: false,
    isProgressCSV: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    orders: [],
    csvData: undefined,
    order: undefined,
    openStatusModal: false,
    openAddModal: false,
    openEditModal: false,
    openDelModal: false,
    openPdfModal: false,
    paging: {}
};

export function orderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OrderTypes.GET_ORDERS_PROG:
            return { ...state, isProgressList: true, orders: [] };
        case OrderTypes.GET_ORDERS_SUCC:
            return { ...state, isProgressList: false, orders: action.payload.result, paging: action.payload.paging };
        case OrderTypes.GET_ORDERS_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case OrderTypes.GET_ORDER_PROG:
            return { ...state, isProgress: true, order: undefined };
        case OrderTypes.GET_ORDER_SUCC:
            return { ...state, isProgress: false, order: action.payload.result, };
        case OrderTypes.GET_ORDER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case OrderTypes.UPDATE_ORDER_STATUS_PROG:
            return { ...state, isProgress: true };
        case OrderTypes.UPDATE_ORDER_STATUS_SUCC:
            return { ...state, isProgress: false, };
        case OrderTypes.UPDATE_ORDER_STATUS_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case OrderTypes.EDIT_ORDER_PROG:
            return { ...state, isProgressEdit: true };
        case OrderTypes.EDIT_ORDER_SUCC:
            return { ...state, isProgressEdit: false, };
        case OrderTypes.EDIT_ORDER_FAIL:
            return { ...state, isProgressEdit: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case OrderTypes.GET_CSV_DATA_PROG:
            return { ...state, isProgressCSV: true };
        case OrderTypes.GET_CSV_DATA_SUCC:
            return { ...state, isProgressCSV: false, csvData: action.payload.result };
        case OrderTypes.GET_CSV_DATA_FAIL:
            return { ...state, isProgressCSV: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        case OrderTypes.CLEAR_CSV_DATA:
            return { ...state, csvData: undefined };


        case OrderTypes.TOGGLE_STATUS_CONFIRMATION_MODAL:
            return { ...state, openStatusModal: !state.openStatusModal, order: state.orders[action.payload.index] };

        case OrderTypes.TOGGLE_EDIT_ORDER_MODAL:
            return { ...state, openEditModal: !state.openEditModal, };


        case OrderTypes.TOGGLE_PDF_ORDER_MODAL:
            return { ...state, openPdfModal: !state.openPdfModal, };

        // case OrderTypes.TOGGLE_DEL_CATEGORY_MODAL:
        //     return { ...state, openDelModal: !state.openDelModal, category: state.categories[action.payload.index] };
        // case OrderTypes.CLEAR_CATEGORY:
        //     return { ...state, category: {} };
        default:
            return state;
    }
}