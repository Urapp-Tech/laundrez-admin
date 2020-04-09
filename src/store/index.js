import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
// reducers

import {
    categoryReducer,
    authReducer,
    serviceReducer,
    faqReducer,
    voucherReducer
} from './reducers';


import { HttpService } from './services/HttpService';
import { AuthTypes } from './action-types/AuthTypes';

// epics
import {
    CategoryEpics,
    AuthEpics,
    ServiceEpics,
    FaqEpics,
    VoucherEpics
} from './epics';

const loggerMiddleware = createLogger();
// Application Reducers
const appReducer = combineReducers({
    category: categoryReducer,
    auth: authReducer,
    service: serviceReducer,
    faq: faqReducer,
    voucher: voucherReducer
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
    CategoryEpics.editCateogry,
    CategoryEpics.delCateogry,

    ServiceEpics.getServices,
    ServiceEpics.addService,
    ServiceEpics.editService,
    ServiceEpics.delService,

    FaqEpics.getFaqs,
    FaqEpics.addFaq,
    FaqEpics.editFaq,
    FaqEpics.delFaq,

    VoucherEpics.getVouchers,
    VoucherEpics.addVoucher,
    VoucherEpics.editVoucher,
    VoucherEpics.delVoucher,



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