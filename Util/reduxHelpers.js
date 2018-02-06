import {combineReducers} from 'redux';
import {showError} from './events';

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
        const comb = Object.keys(enhancements).reduce((comb,key) => { comb[key] = state[key]; return comb; }, {});

        return reducer({...state, ...cr(comb, action)}, action);
    };
}

export function createLoadingHelpers(prefix, name, createUrl, optional = false) {

    // action types
    const LOADING   = `${prefix}_LOAD_${name}_IN_PROGRESS`;
    const COMPLETE  = `${prefix}_LOAD_${name}_COMPLETE`;
    const ERROR     = `${prefix}_LOAD_${name}_ERROR`;
    const CLEANUP   = `${prefix}_LOAD_${name}_CLEANUP`;

    // actions
    const loadingInProgress = ()        => { return {type: LOADING}; };
    const loadingComplete   = (data)    => { return {type: COMPLETE, data}; };
    const loadingError      = ()        => { return {type: ERROR}; };
    const cleanup           = ()        => { return {type: CLEANUP}; };

    // reducer function
    const reducer = (state = {}, action) => {
        switch (action.type) {
            case LOADING:   return {...state, loading: true};
            case COMPLETE:  return {...state, loading: false, data: action.data};
            case ERROR:     return {...state, loading: false, error: true};
            case CLEANUP:   return {};
            default:        return state;
        }
    };

    // loading
    const createLoader = (dispatch, method='GET') =>
        (...args) => {
            const url = createUrl.apply(null, args);
            dispatch(loadingInProgress());
            fetch(url, {credentials: 'include', method: method})
                .then(resp => {
                        if (!resp.ok && !(optional && resp.status === 404)) {
                            throw new Error();
                        } else {
                            return resp;
                        }
                    }
                )
                .then(resp => (resp.status === 404) ? null : resp.json())
                .then(json => dispatch(loadingComplete(json)))
                .catch(() => {
                    dispatch(loadingError());
                    dispatch(showError(`Error loading ${name.toLowerCase()}`));
                });
        };

    // cleaning up
    const createCleanup = (dispatch) => () => dispatch(cleanup());

    // updating data
    const createUpdater = (dispatch) => ({
        start:  ()      => dispatch(loadingInProgress()),
        done:   (data)  => dispatch(loadingComplete(data))
    });

    return {reducer, createLoader, createCleanup, createUpdater};
}