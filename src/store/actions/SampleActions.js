import { SampleTypes } from "../action-types/SampleTypes";


export class SampleActions {
    static sampleReq() {
        return {
            type: SampleTypes.SAMPLE_REQ_PROG
        };
    }
}