import NotificationLayout from './NotificationLayout';
import './index.scss';
import {connect} from 'react-redux';

export const Notification = connect(
    mapStateToProps
)(NotificationLayout);

function mapStateToProps(state) {
    return {
        message: state.ui.message,
        messageType: state.ui.messageType
    };
}
