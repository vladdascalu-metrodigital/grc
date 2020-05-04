import React, { Component } from 'react';
import './index.scss';
import { lookup } from '../../Util/translations';
import PropTypes from 'prop-types';

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
                    return <mrc-number show-currency-for-country={this.props.country}>{this.props.value}</mrc-number>;
                else return '-';
            case 'expiry':
                if (this.props.value !== undefined && this.props.value !== null && this.props.value.limitExpiryDate)
                    return (
                        <span>
                            <mrc-number show-currency-for-country={this.props.country}>
                                {' '}
                                {this.props.value.resetToLimitAmount}
                            </mrc-number>
                            , <mrc-date>{this.props.value.limitExpiryDate}</mrc-date>
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
