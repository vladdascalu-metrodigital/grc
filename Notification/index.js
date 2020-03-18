import NotificationLayout from './NotificationLayout';
import './index.scss';
import { connect } from 'react-redux';

const Notification = connect(mapStateToProps)(NotificationLayout);

export default Notification;

function mapStateToProps(state) {
    return {
        message: state.ui.message,
        messageType: state.ui.messageType,
    };
}
