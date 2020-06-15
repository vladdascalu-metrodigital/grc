import { combineReducers } from 'redux';
import { showError } from './events';

// - takes a 'reducer' that manages its state as a map and 'enhancements'
// - 'enhancements' is an object that has reducers as values
// - returns a reducer that applies all reducers and adds their state to
//   the map of 'reducer'
export function enhanceReducer(reducer, enhancements) {
    const initialState = reducer(undefined, {});
    const cr = combineReducers(enhancements);
    return (state = initialState, action) => {
        // Find that part of state that conforms with the structure of `enhancements`.
        // Otherwise combineReducers will submit a warning.
        const comb = Object.keys(enhancements).reduce((comb, key) => {
            comb[key] = state[key];
            return comb;
        }, {});

        return reducer({ ...state, ...cr(comb, action) }, action);
    };
}

export function createLoadingHelpers(prefix, name, createUrl, optional = false, errorMessageExpected = false) {
    // action types
    const LOADING = `${prefix}_LOAD_${name}_IN_PROGRESS`;
    const COMPLETE = `${prefix}_LOAD_${name}_COMPLETE`;
    const ERROR = `${prefix}_LOAD_${name}_ERROR`;
    const CLEANUP = `${prefix}_LOAD_${name}_CLEANUP`;

    // actions
    const loadingInProgress = () => {
        return { type: LOADING };
    };
    const loadingComplete = data => {
        return { type: COMPLETE, data };
    };
    const loadingError = () => {
        return { type: ERROR };
    };
    const cleanup = () => {
        return { type: CLEANUP };
    };

    // reducer function
    const reducer = (state = {}, action) => {
        switch (action.type) {
            case LOADING:
                return { ...state, loading: true };
            case COMPLETE:
                return { ...state, loading: false, data: action.data };
            case ERROR:
                return { ...state, loading: false, error: true };
            case CLEANUP:
                return {};
            default:
                return state;
        }
    };

    // loading
    const createLoader = dispatch => (...args) => {
        const url = createUrl.apply(null, args);
        dispatch(loadingInProgress());
        return defaultFetchCallHandler(dispatch, fetch(url, { credentials: 'include', method: 'GET' }));
    };

    const createCustomerLoader = dispatch => fetchCall => {
        dispatch(loadingInProgress());
        return defaultFetchCallHandler(dispatch, fetchCall);
    };

    const defaultFetchCallHandler = (dispatch, fetchCall) => {
        return fetchCall
            .then(resp => {
                if (resp.ok) {
                    return resp;
                } else if (optional && resp.status === 404) {
                    return resp;
                } else if (errorMessageExpected && resp.status === 400) {
                    return resp;
                } else {
                    throw new Error();
                }
            })
            .then(resp => (resp.status === 404 ? [null, resp] : resp.json().then(json => [json, resp])))
            .then(([json, resp]) => {
                if (resp.ok || resp.status === 404) {
                    dispatch(loadingComplete(json));
                    return json;
                } else {
                    const msg = json && json.errormessage;
                    throw new Error(msg);
                }
            })
            .catch(error => {
                const msg = error.message || `Error loading ${name.toLowerCase()}`;
                console.error(msg, error);
                dispatch(loadingError());
                dispatch(showError(msg));
            });
    };

    // cleaning up
    const createCleanup = dispatch => () => dispatch(cleanup());

    // updating data
    const createUpdater = dispatch => ({
        start: () => dispatch(loadingInProgress()),
        done: data => dispatch(loadingComplete(data)),
    });

    return { reducer, createLoader, createCleanup, createUpdater, createCustomerLoader };
}
