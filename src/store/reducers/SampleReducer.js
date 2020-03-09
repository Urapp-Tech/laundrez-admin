import { SampleTypes } from '../action-types/SampleTypes';


let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    posts: []
};

export function sampleReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SampleTypes.SAMPLE_REQ_PROG:
            return { ...state, isProgress: true };
        case SampleTypes.SAMPLE_REQ_SUCC:
            return { ...state, isProgress: false, posts: action.payload };
        case SampleTypes.SAMPLE_REQ_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        default:
            return state;
    }
}