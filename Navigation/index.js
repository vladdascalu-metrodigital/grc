import { connect } from 'react-redux';
import NavigationLayout from './NavigationLayout';

// FIXME Typo: expended -> expanded
export const reducer = { burgerMenuExpended: reducerFn };
export const navigationReducer = { activeItem: navigationReducerFn };

function reducerFn(state = false, action) {
    switch (action.type) {
        case 'BURGER_MENU_EXPENDED': // FIXME Typo: expended -> expanded
            return action.value;
        default:
            return state;
    }
}

function navigationReducerFn(state = false, action) {
    switch (action.type) {
        case 'NAVIGATION_ITEM_ACTIVATED':
            return action.item;
        default:
            return state;
    }
}

// FIXME Typo: expended -> expanded
export const burgerMenuExpendedEvent = (value) => ({
    type: 'BURGER_MENU_EXPENDED', // FIXME Typo: expended -> expanded
    value,
});

export const navigationItemActivated = (item) => ({
    type: 'NAVIGATION_ITEM_ACTIVATED',
    item,
});

const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationLayout);

export default Navigation;

function mapStateToProps(state, ownProps) {
    return {
        tablet: state.ui.tablet,
        displayMenu: state.burgerMenuExpended,
        config: state.ui.config,
        active: state.activeItem || ownProps.active,
        // normally bottomToolbar is shown when back button is shown, but can be hidden explicitly to only have back button (e.g. in inbox)
        displayBottomToolbar: !!state.ui.auxControls.back && !state.ui.auxControls.hideBottomToolbar,
        displayBackButton: !!state.ui.auxControls.back,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateBurgerMenuExpended: (value) => dispatch(burgerMenuExpendedEvent(value)),
        updateActiveItem: (item) => dispatch(navigationItemActivated(item)),
    };
}
