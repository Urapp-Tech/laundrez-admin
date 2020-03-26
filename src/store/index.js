import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
// reducers

import { categoryReducer } from './reducers/CategoryReducer';
import { authReducer } from './reducers/AuthReducer';
import { HttpService } from './services/HttpService';

// epics
import { CategoryEpics } from './epics/CategoryEpics';
import { API_URL } from './services/Config';
import { AuthEpics } from './epics/AuthEpics';
import { AuthTypes } from './action-types/AuthTypes';

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
    CategoryEpics.getCategories,
    AuthEpics.signin
);

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        ajaxGet: HttpService.get,
        ajaxPost: HttpService.post,
        ajaxPut: HttpService.put,
        ajaxDel: HttpService.delete,
        API_URL: API_URL
    }
});

const createStoreWithMiddleware = applyMiddleware(epicMiddleware, loggerMiddleware);

export let store = createStore(
    rootReducer,
    createStoreWithMiddleware,
);
epicMiddleware.run(rootEpic);