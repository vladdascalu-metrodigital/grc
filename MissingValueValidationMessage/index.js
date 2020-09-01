import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import AlertWarningSmall from '../icons/AlertWarningSmall';

export default class MissingValueValidationMessage extends Component {
    render() {
        return (
            <div className="mrc-ui-missing-value-validation-messages">
                <AlertWarningSmall size={'xsmall'} color={'current-color'} /> {this.props.message}
            </div>
        );
    }
}

MissingValueValidationMessage.propTypes = {
    message: PropTypes.string.isRequired,
};
