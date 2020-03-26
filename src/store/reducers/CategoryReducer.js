import { CategoryTypes } from '../action-types/CategoryTypes';


let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    categories: [],
    paging: {}
};

export function categoryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CategoryTypes.GET_CATEGORIES_PROG:
            return { ...state, isProgress: true };
        case CategoryTypes.GET_CATEGORIES_SUCC:
            return { ...state, isProgress: false, categories: action.payload.result, paging: action.payload.paging };
        case CategoryTypes.GET_CATEGORIES_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case CategoryTypes.ADD_CATEGORY_PROG:
            return { ...state, isProgress: true };
        case CategoryTypes.ADD_CATEGORY_SUCC:
            return { ...state, isProgress: false,  };
        case CategoryTypes.ADD_CATEGORY_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };
        default:
            return state;
    }
}