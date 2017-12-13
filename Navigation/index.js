import {connect} from 'react-redux';
import NavigationLayout from './NavigationLayout';
import {navFlyoutVisibilityChangeEvent} from '../../comp/Util/events';

// FIXME Typo: expended -> expanded
export const reducer = {burgerMenuExpended: reducerFn};

function reducerFn(state = false, action) {
    switch (action.type) {
        case 'BURGER_MENU_EXPENDED': // FIXME Typo: expended -> expanded
            return action.value;
        default:
            return state;
    }
}

// FIXME Typo: expended -> expanded
export const burgerMenuExpendedEvent = value => ({
    type: 'BURGER_MENU_EXPENDED',// FIXME Typo: expended -> expanded
    value
});

const Navigation = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationLayout);

export default Navigation;

function mapStateToProps(state) {
    return {
        tablet: state.ui.tablet,
        displayMenu: state.burgerMenuExpended,
        displayBottomToolbar: !!state.ui.auxControls.back
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showFlyout: () => dispatch(navFlyoutVisibilityChangeEvent('show')),
        disappearFlyout: () => dispatch(navFlyoutVisibilityChangeEvent('disappear')),
        updateBurgerMenuExpended: (value) => dispatch(burgerMenuExpendedEvent(value))
    };
}
