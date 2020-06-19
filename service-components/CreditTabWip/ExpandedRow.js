import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../../MrcTable';
import CreditTableRowShadow from './CreditTableRowShadow';
import ClientBlocked from '../../ClientBlocked';
import PaymentSection from './PaymentSection';
import LimitSection from './LimitSection';
import PaymentMethodSection from './PaymentMethodSection';
import CustomerAdditionalFieldsSection from './CustomerAdditionalFieldsSection';

import * as _ from 'lodash';
import CreditTableFormSection from './CreditTableFormSection';
import { translations as ts } from './index';
import Grid from '../../Grid';

export default class ExpandedRow extends Component {
    render() {
        const { customer, isExpanded, id, parent } = this.props;

        // TODO: approval service will have more status
        const newAmount =
            parent === 'approval' ? _.get(customer, 'limit.new.amount') : _.get(customer, 'limit.wish.amount');

        // TODO: this must adapted in approval service
        const isCashCustomerRequest =
            parent === 'approval' ? _.get(customer, 'limit.new.amount') === 0 : this.props.requestsCash;
        const isNewCredit = parent === 'approval' ? _.isNil(newAmount) || newAmount !== 0 : !isCashCustomerRequest;
        const isBlocked = _.get(customer, 'blockingInfo.isBlocked');
        const blockingReasonText = isBlocked ? _.get(customer, 'blockingInfo.blockingReasonText') : null;
        const checkoutCheckCodeText = isBlocked ? _.get(customer, 'blockingInfo.checkoutCheckCodeText') : null;

        // TODO: blocking for history
        return [
            <Table.R
                key="sticky"
                sticky={id}
                style={{ '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
            >
                <CreditTableRowShadow />
            </Table.R>,
            parent === 'history' ? (
                <Table.R>
                    <Table.D>
                        <Table.D>
                            {!_.isEmpty(blockingReasonText) ? <ClientBlocked text={blockingReasonText} /> : null}
                            {!_.isEmpty(checkoutCheckCodeText) ? <ClientBlocked text={checkoutCheckCodeText} /> : null}
                        </Table.D>
                    </Table.D>
                </Table.R>
            ) : (
                [
                    isBlocked ? (
                        <Table.R key="blocked" type="form">
                            <Table.D colSpan="8">
                                <CreditTableFormSection title={ts.block} description={ts.blockdescription}>
                                    <React.Fragment>
                                        <Grid cols={1}>
                                            {!_.isEmpty(blockingReasonText) ? (
                                                <ClientBlocked text={blockingReasonText} />
                                            ) : null}
                                        </Grid>
                                        <Grid cols={1}>
                                            {!_.isEmpty(checkoutCheckCodeText) ? (
                                                <ClientBlocked text={checkoutCheckCodeText} />
                                            ) : null}
                                        </Grid>
                                    </React.Fragment>
                                </CreditTableFormSection>
                                <PaymentSection {...{ ...this.props, isCashCustomerRequest }} />
                                {isNewCredit ? (
                                    <React.Fragment>
                                        <hr />
                                        <LimitSection {...this.props} />
                                        <PaymentMethodSection {...this.props} />
                                        <CustomerAdditionalFieldsSection
                                            additionalFields={this.props.customer.additionalFields}
                                        />
                                    </React.Fragment>
                                ) : null}
                            </Table.D>
                        </Table.R>
                    ) : (
                        <Table.R key={'form'} type="form">
                            <Table.D colSpan="8">
                                <PaymentSection {...{ ...this.props, isCashCustomerRequest }} />
                                {isNewCredit ? (
                                    <React.Fragment>
                                        <hr />
                                        <LimitSection {...this.props} />
                                        <PaymentMethodSection {...this.props} />
                                        <CustomerAdditionalFieldsSection
                                            additionalFields={this.props.customer.additionalFields}
                                        />
                                    </React.Fragment>
                                ) : null}
                            </Table.D>
                        </Table.R>
                    ),
                ]
            ),
        ];
    }
}

ExpandedRow.propTypes = {
    onAmountChange: PropTypes.func,
    isExpanded: PropTypes.bool,
    id: PropTypes.string,
    historical: PropTypes.bool,
    country: PropTypes.string,
    isZebra: PropTypes.bool,
    customer: PropTypes.object,
    parent: PropTypes.string,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dateFormat: PropTypes.string,
    requestsCash: PropTypes.bool,
};
