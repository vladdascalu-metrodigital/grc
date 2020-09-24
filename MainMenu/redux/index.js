import { connect } from 'react-redux';
import MainMenu from '../index';
import { navigationItemActivated } from './actions';

function mapStateToProps(state, ownProps) {
    return {
        // tablet: state.ui.tablet,
        // displayMenu: state.burgerMenuExpended,
        navConfig: state.ui.config,
        activeItem: state.activeItem || ownProps.active,
        // displayBackButton: !!state.ui.auxControls.back,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateActiveItem: (item) => dispatch(navigationItemActivated(item)),
    };
}

const ConnectedMainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu);

export default ConnectedMainMenu;
