import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
// reducers

import { sampleReducer } from './reducers/SampleReducer';
import { HttpService } from './services/HttpService';

// epics
import { SampleEpics } from './epics/SampleEpics';

const loggerMiddleware = createLogger();
// Application Reducers
const rootReducer = combineReducers({
    sampleReducer
});

export const rootEpic = combineEpics(
    // more epics functions go here
    SampleEpics.sampleReq
);

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        ajaxGet: HttpService.get,
        ajaxPost: HttpService.post,
        ajaxPut: HttpService.put,
        ajaxDel: HttpService.delete
    }
});

const createStoreWithMiddleware = applyMiddleware(epicMiddleware, loggerMiddleware);

export let store = createStore(
    rootReducer,
    createStoreWithMiddleware,
);
epicMiddleware.run(rootEpic);