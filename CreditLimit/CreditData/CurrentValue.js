import React, { Component } from 'react';
import './index.scss';
import { lookup } from '../../Util/translations';
import PropTypes from 'prop-types';

import MrcNumber from '../../MrcNumber';
import MrcDate from '../../MrcDate';

export default class CurrentValue extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="current-value">
                <label>
                    {lookup('mrc.creditdetails.current')}: {this.toVisualRepresentation()}
                </label>
            </div>
        );
    }

    toVisualRepresentation() {
        switch (this.props.type) {
            case 'limit':
                if (this.isValidNumber())
                    return (
                        <MrcNumber isCurrency country={this.props.country}>
                            {this.props.value}
                        </MrcNumber>
                    );
                else return '-';
            case 'expiry':
                if (this.props.value !== undefined && this.props.value !== null && this.props.value.limitExpiryDate)
                    return (
                        <span>
                            <MrcNumber isCurrency country={this.props.country}>
                                {this.props.value.resetToLimitAmount}
                            </MrcNumber>
                            , <MrcDate>{this.props.value.limitExpiryDate}</MrcDate>
                        </span>
                    );
                else return <span>-</span>;
            default:
                return <span>{this.props.value || '-'}</span>;
        }
    }

    isValidNumber() {
        return (
            (this.props.value !== null && this.props.value !== '' && !Number.isNaN(this.props.value)) ||
            this.props.value === 0
        );
    }
}

CurrentValue.propTypes = {
    type: PropTypes.string,
    value: PropTypes.any,
    country: PropTypes.string,
};
