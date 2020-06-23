import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClientBlocked from '../ClientBlocked';
import BusinessIcon from '../icons/BusinessIcon';
import IconAndLabels from '../icons/IconAndLabels';

import './CustomerToggler.scss';

export default class CustomerToggler extends Component {
    render() {
        return (
            <div className="mrc-ui-customer-toggler">
                <IconAndLabels
                    icon={BusinessIcon}
                    title={this.props.name}
                    subtitle={this.props.storeNumber + '/' + this.props.customerNumber}
                />
                {this.props.isBlocked && (
                    <div className="mrc-ui-customer-toggler-blocked-label">
                        <ClientBlocked />
                    </div>
                )}
            </div>
        );
    }
}

CustomerToggler.propTypes = {
    name: PropTypes.string,
    storeNumber: PropTypes.string,
    customerNumber: PropTypes.string,
    isBlocked: PropTypes.bool,
};
