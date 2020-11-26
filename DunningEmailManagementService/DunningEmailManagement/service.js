import { customersInGroupReduxHelper } from '../redux/reduxHelpers';
import { hideNotification, showSuccess } from '../../Util/events';
import { BACKEND_API_CONTEXT, HTTP_METHOD_NAME_POST } from '../../DunningEmailManagementService/util/Constants';
import { lookup } from '../../Util/translations';
import { addCsrfToken } from '../../Util/csrf';
import { batchRequestReduxHelper } from '../../BatchUpdateService/redux/reduxHelpers';
import { fetchSequentially } from '../../Util/util';
import { mapStatusToErrorCode } from '../util/util';

export function fetchCustomerInGroup(dispatch, country, storeNumber, customerNumber) {
    return customersInGroupReduxHelper.createLoader(dispatch)(country, storeNumber, customerNumber);
}

export function cleanupCustomerInGroup(dispatch) {
    return batchRequestReduxHelper.createCleanup(dispatch)();
}

export function onDunningEmailSave(dispatch, customerId, dunningEmail, accountIds) {
    dispatch(hideNotification());

    const body = {
        country: customerId.country,
        storeNumber: customerId.storeNumber,
        customerNumber: customerId.customerNumber,
        email: dunningEmail,
        accountIds: accountIds,
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return fetchSequentially(
        BACKEND_API_CONTEXT + '/dunningemail/change',
        createRequestInit(HTTP_METHOD_NAME_POST, headers, JSON.stringify(body))
    )
        .then(checkResponseIsOkOrThrowResponse)
        .then((resp) => resp.json())
        .then((json) => {
            dispatch(showSuccess(lookup('mrc.dunningemailmanagement.editStatus.updateSuccessfully')));
            return json;
        })
        .catch((e) => {
            return mapStatusToErrorCode(e.status ? e.status : 500);
        });
}

export function hideDunningEmailChangeNotification(dispatch) {
    dispatch(hideNotification());
}

function createRequestInit(method, headers, body) {
    addCsrfToken(headers);
    return {
        method: method,
        headers: headers,
        body: body,
        credentials: 'include',
    };
}

export const checkResponseIsOkOrThrowResponse = (resp) => {
    if (!resp.ok) {
        throw resp;
    } else {
        return resp;
    }
};
