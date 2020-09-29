import { connect } from 'react-redux';
import AppShell from '../index';

function mapStateToProps(state) {
    return {
        config: state.ui.config,
    };
}

const ConnectedAppShell = connect(mapStateToProps)(AppShell);

export default ConnectedAppShell;
