import { ServiceTypes } from '../action-types/ServiceTypes';


export class ServiceActions {
    static getServices(page = 1) {
        return {
            type: ServiceTypes.GET_SERVICES_PROG,
            payload: { page }
        };
    }
    static addService(body) {
        return {
            type: ServiceTypes.ADD_SERVICE_PROG,
            payload: { body }
        };
    }
    static editService(body) {
        return {
            type: ServiceTypes.EDIT_SERVICE_PROG,
            payload: { body }
        };
    }
    static delService(id) {
        return {
            type: ServiceTypes.DEL_SERVICE_PROG,
            payload: { id }
        };
    }
    static toggleDelServiceModal(index = -1) {
        return {
            type: ServiceTypes.TOGGLE_DEL_SERVICE_MODAL,
            payload: { index }
        };
    }
   
}