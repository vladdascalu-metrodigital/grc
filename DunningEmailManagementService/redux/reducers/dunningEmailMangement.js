import { customersInGroupReduxHelper } from '../reduxHelpers';

export default function (state, action) {
    const newState = customersInGroupReduxHelper.reducer(state, action);
    switch (action.type) {
        default:
            return newState;
    }
    // return newState;
}
