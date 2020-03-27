import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
// reducers

import { categoryReducer } from './reducers/CategoryReducer';
import { authReducer } from './reducers/AuthReducer';


import { HttpService } from './services/HttpService';
import { AuthTypes } from './action-types/AuthTypes';

// epics
import { CategoryEpics } from './epics/CategoryEpics';
import { AuthEpics } from './epics/AuthEpics';

const loggerMiddleware = createLogger();
// Application Reducers
const appReducer = combineReducers({
    category: categoryReducer,
    auth: authReducer
});
const rootReducer = (state, action) => {
    if (action.type === AuthTypes.SIGNOUT_USER) {
        state = undefined;
    }
    return appReducer(state, action);
};

export const rootEpic = combineEpics(
    // more epics functions go here
    AuthEpics.signin,


    CategoryEpics.getCategories,
    CategoryEpics.addCateogry,
    CategoryEpics.editCateogry
);

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        ajaxGet: HttpService.get,
        ajaxPost: HttpService.post,
        ajaxPut: HttpService.put,
        ajaxDel: HttpService.delete,
    }
});

const createStoreWithMiddleware = applyMiddleware(epicMiddleware, loggerMiddleware);

export let store = createStore(
    rootReducer,
    createStoreWithMiddleware,
);
epicMiddleware.run(rootEpic);