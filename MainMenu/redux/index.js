import { connect } from 'react-redux';
import MainMenu from '../index';
import { navigationItemActivated } from './actions';

function mapStateToProps(state, ownProps) {
    return {
        config: state.ui.config,
        activeItem: state.activeItem || ownProps.activeItem,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateActiveItem: (item) => dispatch(navigationItemActivated(item)),
    };
}

const ConnectedMainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu);

export default ConnectedMainMenu;
