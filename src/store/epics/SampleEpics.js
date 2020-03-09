import { of } from 'rxjs';
import { ofType, } from "redux-observable";
import { switchMap, pluck, catchError, map } from "rxjs/operators";

import { SampleTypes } from "../action-types/SampleTypes";

export class SampleEpics {
    static sampleReq(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(SampleTypes.SAMPLE_REQ_PROG), switchMap(() => {
            return ajaxGet(`https://jsonplaceholder.typicode.com/todos/`).pipe(pluck("response"), map(obj => {
                return {
                    type: SampleTypes.SAMPLE_REQ_SUCC,
                    payload: obj
                };
            })
                , catchError((err) => {
                    return of({ type: SampleTypes.SAMPLE_REQ_FAIL, payload: err });
                }));

        }));
    }
}