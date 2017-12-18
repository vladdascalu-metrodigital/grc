import {extractJoinedProps} from './util';
import {createLoadingHelpers, enhanceReducer} from './reduxHelpers';

export const configLoadingHelpers = createLoadingHelpers('UI', 'CONFIG', () => '/creditlimit/api/config');
export const uiReducer = {ui: enhanceReducer(reducerFn, {config: configLoadingHelpers.reducer})};

// when the flyout disappears and the mouse leaves the flyout, do not process the 'hide' event
// because that would cause the flyout to slide to the left (instead of staying 'disappeared')
const allowedTransitions = {
    show: ['hide', 'disappear'],
    hide: ['show'],
    disappear: ['show'],
};

function reducerFn(state = {pageTitle: 'Launch Pad', navFlyoutVisible: 'hide', auxControls: {}}, action) {
    const currentState = state.navFlyoutVisible;
    const newState = action.visibilityState;
    switch (action.type) {
        case 'CURRENT_UI_PAGE_TITLE':
            return Object.assign({}, state, {pageTitle: action.text});
        case 'RESIZE':
            return Object.assign({}, state, {tablet: action.tablet, desktop: action.desktop});
        case 'NAV_FLYOUT_VISIBILITY_CHANGE':
            if (allowedTransitions[currentState].includes(newState)) {
                return Object.assign({}, state, {navFlyoutVisible: action.visibilityState});
            } else {
                return state;
            }
        case 'ERROR':
            return Object.assign({}, state, {error: action.error, showReloadBtn: action.showReloadBtn});
        case 'WARNING':
            return Object.assign({}, state, {message: action.message});
        case 'AUX_CONTROL_EVENT':
            return handleAuxControlState(action, state);
        default:
            return state;
    }
}

function handleAuxControlState(action, state) {
    const paramType = typeof action.value;
    let auxControls = state.auxControls || {};
    if (paramType === 'string') {
        auxControls[action.value] = true;
    } else if (paramType === 'object') {
        auxControls = Object.assign(auxControls, action.value);
    }
    return Object.assign({}, state, {auxControls});
}

let debounceTimeout;
export function debounce(fn, wait, immediate) {
    let context = this;

    return new Promise(resolve => {
        let later = () => {
            debounceTimeout = null;
            if (!immediate) resolve(fn.call(context));
        };

        let callNow = immediate && !debounceTimeout;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(later, wait);

        if (callNow) resolve(fn.call(context));
    });
}

/**
 *
 * @param {Object} creditData
 * @param prefix default = '_'
 * @returns {Object} new Object with filtered properties
 */
export function filterObjectByPrefix(creditData, prefix = '_') {
    const creditDataFiltered = {};
    Object.keys(creditData).filter(k => !k.startsWith(prefix)).forEach((k) => creditDataFiltered[k] = creditData[k]);
    return creditDataFiltered;
}

export function displayName(customer, fallback='Unknown') {
    return extractJoinedProps(customer, 'companyName')
        || extractJoinedProps(customer, 'customerFirstName', 'customerLastName')
        || extractJoinedProps(customer, 'companyOwnerFirstName', 'companyOwnerLastName')
        || fallback;
}
