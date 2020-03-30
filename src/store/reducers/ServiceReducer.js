import { ServiceTypes } from '../action-types/ServiceTypes';


let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    services: [],
    service: undefined,
    paging: {}
};

export function serviceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ServiceTypes.GET_SERVICES_PROG:
            return { ...state, isProgress: true };
        case ServiceTypes.GET_SERVICES_SUCC:
            return { ...state, isProgress: false, services: action.payload.result, paging: action.payload.paging };
        case ServiceTypes.GET_SERVICES_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case ServiceTypes.ADD_SERVICE_PROG:
            return { ...state, isProgress: true };
        case ServiceTypes.ADD_SERVICE_SUCC:
            return { ...state, isProgress: false, };
        case ServiceTypes.ADD_SERVICE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case ServiceTypes.EDIT_SERVICE_PROG:
            return { ...state, isProgress: true };
        case ServiceTypes.EDIT_SERVICE_SUCC:
            return { ...state, isProgress: false, };
        case ServiceTypes.EDIT_SERVICE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case ServiceTypes.DEL_SERVICE_PROG:
            return { ...state, isProgress: true };
        case ServiceTypes.DEL_SERVICE_SUCC:
            return { ...state, isProgress: false, };
        case ServiceTypes.DEL_SERVICE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        default:
            return state;
    }
}