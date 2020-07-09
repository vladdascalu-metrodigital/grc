import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

import StatusBar from '../StatusBar';
import ReportProblemTriangle from '../icons/report-problem-triangle.svg';
import CoinReceive from '../icons/coin-receive.svg';
import MrcNumber from '../MrcNumber';

export default class LimitStatus extends Component {
    render() {
        const customer = this.props.requestedCustomer === null ? {} : this.props.requestedCustomer;
        if (customer.creditLimitStatus === 'valid') {
            const requestedCustomerAmount = customer.creditLimit;
            let groupAmount = 0;
            this.props.customers.data.customers.forEach((groupCustomer) => {
                if (groupCustomer.creditLimitStatus === 'valid') {
                    groupAmount = groupAmount + groupCustomer.creditLimit;
                }
            });
            const shouldRenderGroupLimit = this.props.customers.data.customers.length > 1;
            if (!shouldRenderGroupLimit) {
                return (
                    <StatusBar
                        message={
                            <span>
                                {lookup('creditlimit.status.valid')}{' '}
                                <MrcNumber isCurrency country={customer.country}>
                                    {requestedCustomerAmount}
                                </MrcNumber>
                            </span>
                        }
                        icon={CoinReceive}
                    />
                );
            } else {
                return (
                    <StatusBar
                        message={
                            <span>
                                {lookup('creditlimit.status.valid')}{' '}
                                <MrcNumber isCurrency country={customer.country}>
                                    {requestedCustomerAmount}
                                </MrcNumber>{' '}
                                ({lookup('mrc.groupLimit')}{' '}
                                <MrcNumber isCurrency country={customer.country}>
                                    {groupAmount}
                                </MrcNumber>
                                )
                            </span>
                        }
                        icon={CoinReceive}
                    />
                );
            }
        } else if (customer.creditLimitStatus === 'blocked') {
            return (
                <StatusBar
                    message={lookup('creditlimit.status.blocked')}
                    isWarning={true}
                    icon={ReportProblemTriangle}
                />
            );
        } else {
            return null;
        }
    }
}

LimitStatus.propTypes = {
    requestedCustomer: PropTypes.object.isRequired,
    customers: PropTypes.object.isRequired,
};
