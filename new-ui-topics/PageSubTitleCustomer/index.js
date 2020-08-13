import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { lookup } from '../../Util/translations';

import Pill from '../../Pill';

import './index.scss';

export default class PageSubTitleCustomer extends Component {
    render() {
        let { customerName, customerId, customerStatus } = this.props;
        return (
            <h2 className="mrc-ui-page-subtitle-customer">
                <span className="mrc-ui-page-subtitle-customer-name">{customerName}</span>
                <span className="mrc-ui-page-subtitle-customer-id">{customerId}</span>
                <Pill text={customerStatus} type="danger" />
            </h2>
        );
    }
}

PageSubTitleCustomer.propTypes = {
    customerName: PropTypes.string,
    customerId: PropTypes.string,
    customerStatus: PropTypes.string,
};
