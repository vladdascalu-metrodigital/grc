import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InfoRow from '../../InfoRow';
import { Link } from 'react-router-dom';
import ArrowRight from '../../icons/arrow-right-12.svg';

export default class CustomerInfo extends Component {
    render() {
        const customerDetails = this.props.match.url + '/customerdetails';
        return (
            <div className="customer-info">
                {this.props.showLink ? (
                    <Link to={customerDetails} className="no-underline">
                        {this.createInfoRow(ArrowRight)}
                    </Link>
                ) : (
                    this.createInfoRow()
                )}
            </div>
        );
    }

    createInfoRow(icon) {
        return (
            <InfoRow
                primary={this.props.data.name}
                secondary={`${this.props.data.storeNumber}/${this.props.data.customerNumber}`}
                icon={icon}
            />
        );
    }
}

CustomerInfo.propTypes = {
    data: PropTypes.object,
    showLink: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
};
