import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../MrcTable';
import CreditTableRowShadow from './CreditTable/CreditTableRowShadow';
import ClientBlocked from '../ClientBlocked';
import PaymentSection from './PaymentSection';
import LimitSection from './LimitSection';
import PaymentMethodSection from './PaymentMethodSection';
import CustomerAdditionalFieldsSection from './CustomerAdditionalFieldsSection';

import * as _ from 'lodash';
import FormSection from '../FormSection';
import Grid from '../Grid';
import { isApproval, isHistory } from './creditDataTabUtil';

export default class ExpandedRow extends Component {
    isNewCreditMarked(customer, parent, isCashCustomerRequest) {
        if (isApproval(parent)) {
            if (isCashCustomerRequest) {
                return false;
            }
            if (_.get(customer, 'limit.limitType') === 'NEW' || _.get(customer, 'limit.paymentMethodType') === 'NEW') {
                return true;
            }
            // TODO: adapt to existing approval item, need to be tested
            if (
                _.get(customer, 'limit.limitType') === 'CURRENT' &&
                _.get(customer, 'limit.paymentMethodType') === 'CURRENT' &&
                (!_.isNil(_.get(customer, 'limit.new.amount')) ||
                    !_.isNil(_.get(customer, 'limit.new.product')) ||
                    !_.isNil(_.get(customer, 'limit.new.period')) ||
                    !_.isNil(_.get(customer, 'limit.new.debitType')))
            ) {
                return true;
            }
        } else if (isHistory(parent)) {
            return false;
        }

        return !isCashCustomerRequest;
    }

    render() {
        const { customer, isExpanded, id, parent, translations } = this.props;
        const ts = translations;

        const isCashCustomerRequest = this.props.requestsCash;
        const isNewCredit = this.isNewCreditMarked(customer, parent, isCashCustomerRequest);

        const isBlocked = _.get(customer, 'blockingInfo.isBlocked');
        const blockingReasonText = isBlocked ? _.get(customer, 'blockingInfo.blockingReasonText') : null;
        const checkoutCheckCodeText = isBlocked ? _.get(customer, 'blockingInfo.checkoutCheckCodeText') : null;

        return [
            <Table.R
                key="sticky"
                sticky={id}
                style={{ '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
            >
                <CreditTableRowShadow />
            </Table.R>,
            isBlocked ? (
                <React.Fragment>
                    <Table.R key="blocked" type="form">
                        <Table.D colSpan="8">
                            {this.createBlockingSection(blockingReasonText, checkoutCheckCodeText, ts)}
                            {isHistory(parent) ? null : (
                                <PaymentSection {...{ ...this.props, isCashCustomerRequest }} />
                            )}
                            {isNewCredit ? this.createNewCreditSection() : null}
                            {this.createAdditionalFieldSection(ts, this.props.customer.additionalFields)}
                        </Table.D>
                    </Table.R>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Table.R key={'form'} type="form">
                        <Table.D colSpan="8">
                            {isHistory(parent) ? null : (
                                <PaymentSection {...{ ...this.props, isCashCustomerRequest }} />
                            )}
                            {isNewCredit ? this.createNewCreditSection() : null}
                            {this.createAdditionalFieldSection(ts, this.props.customer.additionalFields)}
                        </Table.D>
                    </Table.R>
                </React.Fragment>
            ),
        ];
    }

    createNewCreditSection() {
        return (
            <React.Fragment>
                <hr />
                <LimitSection {...this.props} />
                <PaymentMethodSection {...this.props} />
            </React.Fragment>
        );
    }

    createBlockingSection(blockingReasonText, checkoutCheckCodeText, ts) {
        return (
            <FormSection title={ts.block} description={ts.blockdescription}>
                <React.Fragment>
                    <Grid cols={1}>
                        {!_.isEmpty(blockingReasonText) ? <ClientBlocked text={blockingReasonText} /> : null}
                    </Grid>
                    <Grid cols={1}>
                        {!_.isEmpty(checkoutCheckCodeText) ? <ClientBlocked text={checkoutCheckCodeText} /> : null}
                    </Grid>
                </React.Fragment>
            </FormSection>
        );
    }

    createAdditionalFieldSection(ts, additionalFields) {
        return <CustomerAdditionalFieldsSection additionalFields={additionalFields} translations={ts} />;
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
    translations: PropTypes.object.isRequired,
    isContractingStepEditable: PropTypes.bool,
};
