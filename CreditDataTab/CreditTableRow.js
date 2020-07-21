import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreditTableRowApproval from './CreditTableRowApproval';
import CreditTableRowCreditLimit from './CreditTableRowCreditLimit';
import CreditTableRowHistory from './CreditTableRowHistory';
import CreditTableRowCreditCorrection from './CreditTableRowCreditCorrection';

import * as _ from 'lodash';
import { isApproval, isCreditCorrection, isCreditLimit, isHistory } from './creditDataTabUtil';

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

        // edge case for existing old data
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
        const additionalFields = _.get(customer, 'additionalFields');
        const isBlocked = blockingInfo && _.get(blockingInfo, 'isBlocked');
        const hasCustomerAdditionalFields = additionalFields && _.get(additionalFields, 'hasCustomerAdditionalFields');
        const rowProps = {
            onExpand: () => this.toggle(),
            onHover: (flag) => this.hover(flag),
            isExpanded: this.state.isExpanded,
            isHovered: this.state.isHovered,
            canToggle: parent !== 'history' || isBlocked || hasCustomerAdditionalFields,
            rowType: isZebra ? 'zebra' : null,
        };

        if (isApproval(parent)) {
            const requestsCash = this.isCashCustomerMarked(customer);
            return <CreditTableRowApproval {...{ ...this.props, ...rowProps, requestsCash }} />;
        } else if (isCreditLimit(parent)) {
            const requestsCash = this.isCashCustomerMarked(customer);
            return <CreditTableRowCreditLimit {...{ ...this.props, ...rowProps, requestsCash }} />;
        } else if (isHistory(parent)) {
            return <CreditTableRowHistory {...{ ...this.props, ...rowProps }} />;
        } else if (isCreditCorrection(parent)) {
            return <CreditTableRowCreditCorrection {...{ ...this.props, ...rowProps }} />;
        }
        return null;
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
    translations: PropTypes.object.isRequired,
    isContractingStepEditable: PropTypes.bool,
    historyRequestType: PropTypes.oneOf(['LIMIT_EXPIRY', 'LIMIT_REQUEST', 'CREDIT_CORRECTION', 'CONI_REQUEST'])
        .isRequired,
    selectedGroupAction: PropTypes.string,
    activated: PropTypes.bool,
};
