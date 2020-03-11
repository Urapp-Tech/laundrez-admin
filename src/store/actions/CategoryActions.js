import { CategoryTypes } from '../action-types/CategoryTypes';


export class CategoryActions {
    static getCategories(page = 1) {
        return {
            type: CategoryTypes.GET_CATEGORIES_PROG,
            payload: { page }
        };
    }
}