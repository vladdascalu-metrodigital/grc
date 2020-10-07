import { batchRequestReduxHelper } from '../reduxHelpers';

export default function (state, action) {
    const newState = batchRequestReduxHelper.reducer(state, action);
    switch (action.type) {
        default:
            return newState;
    }
    // return newState;
}
