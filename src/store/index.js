import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
// reducers

import { categoryReducer } from './reducers/CategoryReducer';
import { HttpService } from './services/HttpService';

// epics
import { CategoryEpics } from './epics/CategoryEpics';
import { API_URL } from './services/config';

const loggerMiddleware = createLogger();
// Application Reducers
const rootReducer = combineReducers({
    category: categoryReducer
});

export const rootEpic = combineEpics(
    // more epics functions go here
    CategoryEpics.getCategories
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