import { OrderTypes } from '../action-types/OrderTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    orders: [],
    openAddModal: false,
    openEditModal: false,
    openDelModal: false,
    category: undefined,
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


        // case OrderTypes.ADD_CATEGORY_PROG:
        //     return { ...state, isProgress: true };
        // case OrderTypes.ADD_CATEGORY_SUCC:
        //     return { ...state, isProgress: false, };
        // case OrderTypes.ADD_CATEGORY_FAIL:
        //     return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        // case OrderTypes.EDIT_CATEGORY_PROG:
        //     return { ...state, isProgress: true };
        // case OrderTypes.EDIT_CATEGORY_SUCC:
        //     return { ...state, isProgress: false, };
        // case OrderTypes.EDIT_CATEGORY_FAIL:
        //     return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        // case OrderTypes.DEL_CATEGORY_PROG:
        //     return { ...state, isProgress: true };
        // case OrderTypes.DEL_CATEGORY_SUCC:
        //     return { ...state, isProgress: false, };
        // case OrderTypes.DEL_CATEGORY_FAIL:
        //     return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        // case OrderTypes.TOGGLE_ADD_CATEGORY_MODAL:
        //     return { ...state, openAddModal: !state.openAddModal };

        // case OrderTypes.TOGGLE_EDIT_CATEGORY_MODAL:
        //     return { ...state, openEditModal: !state.openEditModal, category: state.categories[action.payload.index] };

        // case OrderTypes.TOGGLE_DEL_CATEGORY_MODAL:
        //     return { ...state, openDelModal: !state.openDelModal, category: state.categories[action.payload.index] };
        // case OrderTypes.CLEAR_CATEGORY:
        //     return { ...state, category: {} };
        default:
            return state;
    }
}