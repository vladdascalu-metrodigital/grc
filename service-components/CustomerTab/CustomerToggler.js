import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClientBlocked from '../ClientBlocked';
import BusinessIcon from '../../icons/BusinessIcon';

import './CustomerToggler.scss';

export default class CustomerToggler extends Component {
    render() {
        return (
            <div className="mrc-ui-customer-toggler">
                <BusinessIcon />
                <div className="mrc-ui-customer-toggler-customer">
                    <span className="mrc-ui-customer-toggler-name">Meier GmbH</span>
                    <br />
                    <span className="mrc-ui-customer-toggler-number">122/45060</span>
                </div>
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
    customer: PropTypes.shape({
        isBlocked: PropTypes.bool,
    }),
    isBlocked: PropTypes.bool,
};
