import { createLoadingHelpers } from '../../Util/reduxHelpers';
import { BACKEND_API_CONTEXT } from '../util/Constants';
import { utilFactory } from '../../Util';

export const configReduxHelper = utilFactory(`${BACKEND_API_CONTEXT}/config`);

export const customersInGroupReduxHelper = createLoadingHelpers(
    'DUNNING_EMAIL_MANAGEMENT',
    'CUSTOMERS',
    (country, storeNumber, customerNumber) =>
        `${BACKEND_API_CONTEXT}/customers/${country}/${storeNumber}/${customerNumber}`
);
