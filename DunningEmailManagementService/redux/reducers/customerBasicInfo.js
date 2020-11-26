import { customersInGroupReduxHelper } from '../reduxHelpers';
import { displayCustomerId, displayCustomerName } from '../../util/util';

export default function (state, action) {
    const newState = customersInGroupReduxHelper.reducer(state, action);
    switch (action.type) {
        default:
            if (newState.data && !newState.data.loading && newState.data.customerBasicInfo) {
                return {
                    customerName: displayCustomerName(newState.data.customerBasicInfo),
                    customerId: displayCustomerId(newState.data.customerBasicInfo),
                };
            }
            return newState;
    }
    // return newState;
}
