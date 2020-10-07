import { batchRequestReduxHelper } from '../redux/reduxHelpers';
import {
    BACKEND_API_CONTEXT,
    BACKEND_BATCH_REQUEST_CONTEXT,
    ERROR_KEY_PREFIX,
    HTTP_METHOD_NAME_DELETE,
    HTTP_METHOD_NAME_POST,
} from '../util/Constants';
import { hideNotification, showError } from '../../Util/events';
import { lookup } from '../../Util/translations';
import { checkResponseIsOk } from '../../Util';
import { addCsrfToken } from '../../Util/csrf';

export function fetchBatchRequests(dispatch) {
    return batchRequestReduxHelper.createLoader(dispatch)();
}

export function cleanupBatchRequests(dispatch) {
    return batchRequestReduxHelper.createCleanup(dispatch)();
}

export function uploadBatchRequest(dispatch, country, fileContent, titleEntered, batchType) {
    dispatch(hideNotification());
    let bodyContent = new FormData();
    bodyContent.append('file', fileContent);
    bodyContent.append('title', titleEntered);
    bodyContent.append('country', country);
    bodyContent.append('batchType', batchType);

    return fetch(BACKEND_API_CONTEXT + '/upload', createRequestInit(HTTP_METHOD_NAME_POST, new Headers(), bodyContent))
        .then(checkResponseIsOkOrThrowResponse)
        .then((resp) => resp.json())
        .catch((err) => {
            parseAndDispatchErrorOrDefault(err, 'upload', dispatch);
        });
}

export function startProcess(dispatch, id) {
    dispatch(hideNotification());
    return fetch(
        BACKEND_BATCH_REQUEST_CONTEXT + '/' + id + '/startProcessing',
        createRequestInit(HTTP_METHOD_NAME_POST, new Headers(), new FormData())
    )
        .then(checkResponseIsOk)
        .catch(() => {
            dispatch(showError(lookup(ERROR_KEY_PREFIX + 'start')));
        });
}

export function cancelProcess(dispatch, id) {
    dispatch(hideNotification());
    return fetch(
        BACKEND_BATCH_REQUEST_CONTEXT + '/' + id + '/cancelProcessing',
        createRequestInit(HTTP_METHOD_NAME_POST, new Headers(), new FormData())
    )
        .then(checkResponseIsOk)
        .catch(() => {
            dispatch(showError(lookup(ERROR_KEY_PREFIX + 'cancel')));
        });
}

export function deleteProcess(dispatch, id) {
    dispatch(hideNotification());
    return fetch(
        BACKEND_BATCH_REQUEST_CONTEXT + '/' + id,
        createRequestInit(HTTP_METHOD_NAME_DELETE, new Headers(), new FormData())
    )
        .then(checkResponseIsOk)
        .catch(() => {
            dispatch(showError(lookup(ERROR_KEY_PREFIX + 'delete')));
        });
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

export const parseAndDispatchErrorOrDefault = (err, defaultErrMsg, dispatch) => {
    if (typeof err.text === 'function') {
        err.text().then((errorMessage) => {
            if (errorMessage) {
                dispatch(showError(lookup(ERROR_KEY_PREFIX + errorMessage)));
            } else {
                dispatch(showError(lookup(ERROR_KEY_PREFIX + defaultErrMsg)));
            }
        });
    } else {
        dispatch(showError(lookup(ERROR_KEY_PREFIX + defaultErrMsg)));
    }
};
