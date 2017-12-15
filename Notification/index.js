import ErrorLayout from './ErrorLayout';
import WarningLayout from './WarningLayout';
import './index.scss';
import {connect} from 'react-redux';

export const Error = connect(
    mapStateToPropsError
)(ErrorLayout);

export const Warning = connect(
    mapStateToPropsWarn
)(WarningLayout);


function mapStateToPropsError(state) {
    return {
        error: state.ui.error,
        showReloadBtn: state.ui.showReloadBtn
    };
}

function mapStateToPropsWarn(state) {
    return {message: state.ui.message};
}