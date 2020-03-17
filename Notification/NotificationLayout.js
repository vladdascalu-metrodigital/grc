import React, { Component } from 'react';
import './index.scss';

export default class NotificationLayout extends Component {
    createNotification(message, messageType) {
        return (
            <div className={`mrc-notification ${messageType.toLowerCase()}`}>
                <div className="message">{message}</div>
            </div>
        );
    }

    render() {
        return this.props.message ? this.createNotification(this.props.message, this.props.messageType) : null;
    }
}
