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
import { isApproval, isCreditCorrection, isHistory, isPrepayment } from './creditDataTabUtil';
import CreditCorrectionMessageSection from './CreditCorrectionMessageSection';
import { TYPE } from '../Card';
import CreditCorrectionCustomerActionsSection from './CreditCorrectionCustomerActionsSection';
import { lookup } from '../Util/translations';
import CheckCard from '../CheckCard';

export default class ExpandedRow extends Component {
    isNewCreditMarked(customer, parent, isCashCustomerRequest, isPrepaymentRequest) {
        if (isApproval(parent)) {
            if (isPrepaymentRequest) {
                return false;
            }

            if (isCashCustomerRequest) {
                return false;
            }
            if (_.get(customer, 'limit.limitType') === 'NEW' || _.get(customer, 'limit.paymentMethodType') === 'NEW') {
                return true;
            }
            // adapt to old existing approval item
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
        } else if (isPrepayment(parent)) {
            return false;
        }

        return !isCashCustomerRequest;
    }

    render() {
        const { customer, isExpanded, id, parent, translations, activated, isPrepaymentRequest } = this.props;
        const ts = translations;

        const isCashCustomerRequest = this.props.requestsCash;
        const isNewCredit = this.isNewCreditMarked(customer, parent, isCashCustomerRequest, isPrepaymentRequest);

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
            <React.Fragment>
                <Table.R key={'form'} type="form">
                    <Table.D colSpan="8">
                        {this.createActivationResultSection(parent, activated, customer, ts)}
                        {isBlocked ? this.createBlockingSection(blockingReasonText, checkoutCheckCodeText, ts) : null}
                        {isHistory(parent) ||
                        isCreditCorrection(parent) ||
                        isPrepayment(parent) ||
                        (isApproval(parent) && isPrepaymentRequest) ? null : (
                            <PaymentSection {...{ ...this.props, isCashCustomerRequest }} />
                        )}
                        {isNewCredit || isCreditCorrection(parent) ? this.createNewCreditSection() : null}
                        {isPrepayment(parent) ? this.createPrepaymentSection() : null}
                        {this.createAdditionalFieldSection(ts, this.props.customer.additionalFields)}
                    </Table.D>
                </Table.R>
            </React.Fragment>,
        ];
    }

    createPrepaymentSection() {
        const { customer, translations } = this.props;
        const isCashCustomer = customer.isCashCustomer;
        const ts = translations;
        const creditOption = _.get(customer, 'limit.creditOption');
        const currentAmount = _.get(customer, 'limit.current.amount');

        return (
            <FormSection title={ts.customerAction} description={ts.customerActionDescription}>
                <h4 className="mrc-ui-form-label mb-2">{ts.chooseCustomerAction}</h4>
                <Grid cols={4}>
                    <CheckCard
                        key={0}
                        title={ts.noChangeAction}
                        checked={creditOption === 'NONE'}
                        onClick={() => {
                            if (creditOption !== 'NONE') {
                                customer.onChangeCreditOption(currentAmount, null, null, null, 'NONE');
                            }
                        }}
                    />
                    {isCashCustomer || currentAmount == '0' || !currentAmount ? (
                        <CheckCard
                            key={0}
                            title={ts.prepayment}
                            checked={creditOption === 'PREPAYMENT'}
                            onClick={() => {
                                if (creditOption !== 'PREPAYMENT') {
                                    customer.onChangeCreditOption(
                                        0,
                                        'mrc.payment.Bank_Transfer',
                                        'mrc.payment.0',
                                        null,
                                        'PREPAYMENT'
                                    );
                                }
                            }}
                        />
                    ) : null}
                </Grid>
            </FormSection>
        );
    }

    createNewCreditSection() {
        const { customer, parent, activated, selectedGroupAction, translations } = this.props;
        const ts = translations;
        if (isCreditCorrection(parent)) {
            return (!activated || this.isActivationFailedForCustomer(activated, customer)) &&
                this.isNotGroupActionForCustomer(selectedGroupAction) ? (
                <React.Fragment>
                    <hr />
                    <CreditCorrectionCustomerActionsSection {...this.props} />
                </React.Fragment>
            ) : this.isNotGroupActionForCustomer(selectedGroupAction) ? null : (
                <CreditCorrectionMessageSection
                    title={ts.noActionPossible}
                    description={ts.noActionPossibleDescription}
                    type={TYPE.ERROR}
                    result={
                        ts.noActionPossibleReason +
                        ': ' +
                        lookup('mrc.blocking-option.' + selectedGroupAction.toLowerCase())
                    }
                />
            );
        }

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

    createActivationResultSection(parent, activated, customer, ts) {
        if (!isCreditCorrection(parent)) {
            return null;
        }
        if (activated === true) {
            const isNoChange =
                _.get(customer, 'limit.creditOption') === 'NONE' &&
                _.isNil(_.get(customer, 'limit.new.blockingOption'));
            return (
                <CreditCorrectionMessageSection
                    title={ts.activationResult}
                    description={ts.activationResultDescription}
                    type={
                        isNoChange
                            ? TYPE.PRIMARY_BLUE
                            : _.get(customer, 'failedActivation') === true
                            ? TYPE.ERROR
                            : TYPE.PRIMARY_GREEN
                    }
                    result={isNoChange ? ts.activationNoChange : _.get(customer, 'activationResult')}
                />
            );
        }
        return null;
    }

    isActivationFailedForCustomer(activated, customer) {
        return (
            activated === true &&
            _.get(customer, 'limit.creditOption') !== 'NONE' &&
            _.get(customer, 'failedActivation') === true
        );
    }

    isNotGroupActionForCustomer(selectedGroupAction) {
        return selectedGroupAction === 'NONE';
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
    selectedGroupAction: PropTypes.string,
    activated: PropTypes.bool,
    canCorrect: PropTypes.bool, // creditcorrection
    canBlock: PropTypes.bool, // creditcorrection
    isPrepaymentRequest: PropTypes.bool,
};
