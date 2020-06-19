import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class InputValidationMessages extends Component {
    render() {
        let { messages } = this.props;
        if (!messages || messages.length === 0) return null;
        return (
            <div className="mrc-ui-input-validation-messages">
                {messages.map((m, i) => (
                    <span key={i}>{m}</span>
                ))}
            </div>
        );
    }
}

InputValidationMessages.propTypes = {
    messages: PropTypes.array,
};
