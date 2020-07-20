import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClientBlocked from '../../ClientBlocked';
import BusinessIcon from '../../icons/BusinessIcon';
import IconAndLabels from '../../icons/IconAndLabels';

import './CustomerToggler.scss';

export default class CustomerToggler extends Component {
    render() {
        return (
            <div className="mrc-ui-customer-toggler">
                <IconAndLabels icon={BusinessIcon} title="Meier GmbH" subtitle="122/45060" />
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
