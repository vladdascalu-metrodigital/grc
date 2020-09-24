import { actionTypes } from './actions';

export const navigationReducer = { activeItem: navigationReducerFn };

function navigationReducerFn(state = false, action) {
    switch (action.type) {
        case actionTypes.NAVIGATION_ITEM_ACTIVATED:
            return action.item;
        default:
            return state;
    }
}
