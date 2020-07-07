import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreditTableRowApproval from './CreditTableRowApproval';
import CreditTableRowCreditLimit from './CreditTableRowCreditLimit';
import CreditTableRowHistory from './CreditTableRowHistory';

import * as _ from 'lodash';

export default class CreditTableRow extends Component {
    constructor(props) {
        super(props);
        this.toggle.bind(this);
        this.hover.bind(this);
        this.state = {
            isHovered: false,
            isExpanded: false,
        };
    }

    hover(hoverState) {
        this.setState({
            isHovered: hoverState,
        });
    }

    toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    isCashCustomerMarked(customer) {
        // TODO: To Cash -- currently credit customer can't apply this, remove the check later
        if (!customer.isCashCustomer) {
            return false;
        }

        if (_.get(customer, 'limit.creditOption') === 'CREDITTOCASH') {
            return true;
        }

        return (
            _.get(customer, 'limit.limitType') === 'CURRENT' &&
            _.get(customer, 'limit.paymentMethodType') === 'CURRENT' &&
            _.get(customer, 'limit.creditOption') === 'NONE' &&
            customer.isCashCustomer
        );
    }

    render() {
        const { parent, customer, isZebra } = this.props;
        const blockingInfo = _.get(customer, 'blockingInfo');
        const isBlocked = blockingInfo && _.get(blockingInfo, 'isBlocked');
        const rowProps = {
            onExpand: () => this.toggle(),
            onHover: (flag) => this.hover(flag),
            isExpanded: this.state.isExpanded,
            isHovered: this.state.isHovered,
            canToggle: parent !== 'history' || isBlocked,
            rowType: isZebra ? 'zebra' : null,
        };

        // in history, new limit is called current
        /*
        const hasNewLimit = !_.isNil(
            parent === 'history' ? _.get(customer, 'limit.current') : _.get(customer, 'limit.new')
        ) || parent === 'approval';*/

        const requestsCash = this.isCashCustomerMarked(customer);

        if (parent === 'approval') {
            return <CreditTableRowApproval {...{ ...this.props, ...rowProps, requestsCash }} />;
        } else if (parent === 'creditlimit') {
            return <CreditTableRowCreditLimit {...{ ...this.props, ...rowProps, requestsCash }} />;
        } else {
            return <CreditTableRowHistory {...{ ...this.props, ...rowProps, requestsCash }} />;
        }
    }
}

CreditTableRow.propTypes = {
    isExpanded: PropTypes.bool,
    isHovered: PropTypes.bool,
    canToggle: PropTypes.bool,
    id: PropTypes.string,
    parent: PropTypes.string,
    country: PropTypes.string,
    isZebra: PropTypes.bool,
    customer: PropTypes.object,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dateFormat: PropTypes.string,
};
