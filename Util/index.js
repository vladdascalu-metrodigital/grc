export const uiReducer = {ui: reducerFn};

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
            return Object.assign({}, state, {error: action.error});
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