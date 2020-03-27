import { CategoryTypes } from '../action-types/CategoryTypes';


export class CategoryActions {
    static getCategories(page = 1) {
        return {
            type: CategoryTypes.GET_CATEGORIES_PROG,
            payload: { page }
        };
    }
    static addCategory(body) {
        return {
            type: CategoryTypes.ADD_CATEGORY_PROG,
            payload: { body }
        };
    }
    static clearCategory() {
        return {
            type: CategoryTypes.CLEAR_CATEGORY
        };
    }
}