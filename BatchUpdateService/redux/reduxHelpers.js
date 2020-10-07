import { createLoadingHelpers } from '../../Util/reduxHelpers';
import { BACKEND_API_CONTEXT, BACKEND_BATCH_REQUEST_CONTEXT } from '../util/Constants';
import { utilFactory } from '../../Util';

export const configReduxHelper = utilFactory(`${BACKEND_API_CONTEXT}/config`);

export const batchRequestReduxHelper = createLoadingHelpers(
    'BATCH_UPDATE',
    'LIST',
    () => BACKEND_BATCH_REQUEST_CONTEXT + '/byType/CREDIT_CORRECTION?sort=uploadDate,DESC&pageNumber=0&pageSize=1000'
);
