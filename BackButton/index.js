import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { COLOR as IC } from '../icons';

export default class BackButton extends Component {
    render() {
        return (
            <button type="button" onClick={this.props.onClick}>
                <ArrowLeftIcon color={IC.INTERACTION} />
            </button>
        );
    }
}

BackButton.propTypes = {
    onClick: PropTypes.func,
};
