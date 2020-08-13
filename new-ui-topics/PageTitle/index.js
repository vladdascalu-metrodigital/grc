import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Pill from '../../Pill';

import './index.scss';

export default class PageTitle extends Component {
    render() {
        let { title, customerName, customerId, customerStatus } = this.props;
        let className = classnames('mrc-ui-page-title');
        return (
            <div className={className}>
                <h1 className="mrc-ui-page-title-title">{title}</h1>
                <div className="mrc-ui-page-title-subtitle">
                    <h2 className="mrc-ui-page-title-subtitle-customer">
                        {customerName && (
                            <span className="mrc-ui-page-title-subtitle-customer-name">{customerName}</span>
                        )}
                        {customerId && <span className="mrc-ui-page-title-subtitle-customer-id">{customerId}</span>}
                        {customerStatus && <Pill text={customerStatus} type="danger" />}
                    </h2>
                </div>
            </div>
        );
    }
}

PageTitle.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    customerName: PropTypes.string,
    customerId: PropTypes.string,
    customerStatus: PropTypes.string,
};
