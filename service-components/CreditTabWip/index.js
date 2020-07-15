import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainContent from '../../MainContent';
import Table from '../../MrcTable';
import Grid, { GridItem } from '../../Grid';
import { lookup } from '../../Util/translations';

import CreditTableHead from './CreditTableHead';
import CreditTableRow from './CreditTableRow';

import './index.scss';

import * as _ from 'lodash';
import AdditionalFieldsSectionWithDialog from '../../AdditionalFieldsNew/AdditionalFieldsSectionWithDialog';
import CreditProgram from '../../CreditProgramNew';

export default class CreditTab extends Component {
    constructor(props) {
        super(props);
    }

    createTranslations() {
        return {
            blocked: lookup('mrc.status.blocked'),
            customerWish: lookup('mrc.credittab.customerWish'),
            current: lookup('mrc.creditdata.current'),
            pick: lookup('mrc.credittab.pick'),
            old: lookup('mrc.credittab.old'),
            new: lookup('mrc.credittab.new'),
            days: lookup('mrc.credittab.days'),
            choosepayment: lookup('mrc.credittab.choosepayment'),
            choosepaymentmethod: lookup('mrc.credittab.choosepaymentmethod'),
            choosenewpaymentmethod: lookup('mrc.credittab.choosenewpaymentmethod'),
            chooseamount: lookup('mrc.credittab.chooseamount'),
            chooselimit: lookup('mrc.credittab.chooselimit'),
            chooseexpiry: lookup('mrc.credittab.chooseexpiry'),
            updateexpiry: lookup('mrc.credittab.updateexpiry'),
            chooseproduct: lookup('mrc.credittab.chooseproduct'),
            choosedebittype: lookup('mrc.credittab.choosedebittype'),
            creditperiod: lookup('mrc.creditdetails.creditperiod'),
            prepayment: lookup('mrc.payment.Prepayment'),
            cash: lookup('mrc.credittab.cash'),
            payment: lookup('mrc.credittab.payment'),
            paymentdescription: lookup('mrc.credittab.paymentdescription'),
            paymentmethod: lookup('mrc.credittab.paymentmethod'),
            paymentmethoddescription: lookup('mrc.credittab.paymentmethoddescription'),
            credit: lookup('mrc.creditdata.title'),
            limit: lookup('mrc.credittab.limit'),
            limitdescription: lookup('mrc.credittab.limitdescription'),
            block: lookup('mrc.credittab.block'),
            blockdescription: lookup('mrc.credittab.blockdescription'),
            amount: lookup('mrc.attachments.amount'),
            resetLimit: lookup('mrc.credittab.resetLimit'),
            setExpiryDateForAll: lookup('mrc.credittab.setExpiryDateForAll'),
            withoutExpiry: lookup('mrc.credittab.withoutExpiry'),
            expiryDate: lookup('mrc.creditdetails.limitExpiryDate'),
            exhausted: lookup('mrc.credittab.exhausted'),
            granted: lookup('mrc.credittab.granted'),
            newlyGranted: lookup('mrc.credittab.newlyGranted'),
            customergroup: lookup('mrc.credittab.customergroup'),
            toBeGranted: lookup('mrc.credittab.toBeGranted'),
            expiry: lookup('mrc.credittab.expiry'),
            customer: lookup('mrc.customerdata.title'),
            creditproduct: lookup('mrc.creditdetails.creditproduct'),
            customerAdditionalFields: lookup('mrc.creditdetails.customerAdditionalFields'),
            customerAdditionalFieldsDescription: lookup('mrc.creditdetails.customerAdditionalFieldsDescription'),
            nochange: lookup('mrc.credittab.nochange'),
        };
    }

    render() {
        console.log(this.props);
        const {
            customers,
            parent,
            country,
            dateFormat,
            isContractingStepEditable,
            historyRequestType,
            isCreditDataInRed,
        } = this.props;
        const translations = this.createTranslations();
        return (
            <MainContent>
                <Grid>
                    {this.props.additionalFields && this.props.additionalFields.hasGroup ? (
                        <AdditionalFieldsSectionWithDialog
                            onChange={this.props.additionalFields.group.onChange}
                            onBlur={this.props.additionalFields.group.onBlur}
                            title={lookup('mrc.credittab.groupdetails')}
                            editable={this.props.additionalFields.group.editable}
                            requestFields={this.props.additionalFields.group.requestFields}
                            disabled={this.props.additionalFields.group.disabled}
                        />
                    ) : null}
                    {this.props.additionalFields && this.props.additionalFields.hasRequest ? (
                        <AdditionalFieldsSectionWithDialog
                            onChange={this.props.additionalFields.request.onChange}
                            onBlur={this.props.additionalFields.request.onBlur}
                            title={lookup('mrc.credittab.requestdetails')}
                            editable={this.props.additionalFields.request.editable}
                            requestFields={this.props.additionalFields.request.requestFields}
                            disabled={this.props.additionalFields.request.disabled}
                        />
                    ) : null}
                    {this.props.creditProgram ? (
                        <CreditProgram
                            limitRequestId={this.props.creditProgram.limitRequestId}
                            getCreditPrograms={this.props.creditProgram.getCreditPrograms}
                            setCreditPrograms={this.props.creditProgram.setCreditPrograms}
                            setValidity={this.props.creditProgram.setValidity}
                            readOnly={this.props.creditProgram.readOnly}
                            defaultText={this.props.creditProgram.defaultText}
                        />
                    ) : null}

                    <GridItem colSpan="all">
                        <Table.Root>
                            <Table.Body>
                                <CreditTableHead {...{ ...this.props, translations: translations }} />
                                {customers
                                    ? customers.map((customer, i) => (
                                          <CreditTableRow
                                              customer={customer}
                                              parent={parent}
                                              key={_.get(customer, 'customerData.displayName')}
                                              id={'credit-table-sticky-row-' + i}
                                              isZebra={!!(i % 2)}
                                              country={country}
                                              dateFormat={dateFormat}
                                              translations={translations}
                                              isContractingStepEditable={isContractingStepEditable}
                                              historyRequestType={historyRequestType}
                                              isCreditDataInRed={isCreditDataInRed}
                                          />
                                      ))
                                    : null}
                            </Table.Body>
                        </Table.Root>
                    </GridItem>
                </Grid>
            </MainContent>
        );
    }
}

CreditTab.propTypes = {
    country: PropTypes.oneOf(['AT', 'CN', 'DE', 'ES', 'HR', 'PK', 'PL', 'PT', 'RO', 'RS', 'RU', 'UA']).isRequired,
    customers: PropTypes.arrayOf(
        PropTypes.shape({
            blockingInfo: PropTypes.shape({
                isBlocked: PropTypes.bool,
                blockingReasonText: PropTypes.string,
                checkoutCheckCodeText: PropTypes.string,
            }),
            limit: PropTypes.shape({
                old: PropTypes.shape({
                    amount: PropTypes.number,
                    debitType: PropTypes.string,
                    product: PropTypes.string,
                    period: PropTypes.string,
                    expiry: PropTypes.shape({
                        date: PropTypes.string,
                        amount: PropTypes.number,
                    }),
                }),
                current: PropTypes.shape({
                    amount: PropTypes.number,
                    debitType: PropTypes.string,
                    product: PropTypes.string,
                    period: PropTypes.string,
                    expiry: PropTypes.shape({
                        date: PropTypes.string,
                        amount: PropTypes.number,
                    }),
                }),
                wish: PropTypes.shape({
                    amount: PropTypes.number,
                    debitType: PropTypes.string,
                    product: PropTypes.string,
                    period: PropTypes.string,
                    expiry: PropTypes.shape({
                        date: PropTypes.string,
                        amount: PropTypes.number,
                    }),
                }),
                applied: PropTypes.shape({
                    amount: PropTypes.number,
                    debitType: PropTypes.string,
                    product: PropTypes.string,
                    period: PropTypes.string,
                    expiry: PropTypes.shape({
                        date: PropTypes.string,
                        amount: PropTypes.number,
                    }),
                }),
                new: PropTypes.shape({
                    amount: PropTypes.number,
                    debitType: PropTypes.string,
                    product: PropTypes.string,
                    period: PropTypes.string,
                    expiry: PropTypes.shape({
                        date: PropTypes.string,
                        amount: PropTypes.number,
                    }),
                }),
                limitType: PropTypes.string.isRequired,
                paymentMethodType: PropTypes.string.isRequired,
                creditOption: PropTypes.string.isRequired,
                valid: PropTypes.bool.isRequired,
                readOnly: PropTypes.bool.isRequired,
            }).isRequired,
            availablePayments: PropTypes.array,
            name: PropTypes.string.isRequired,
            number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            storeNumber: PropTypes.string.isRequired,
            onExpiryChange: PropTypes.func,
            onLimitChange: PropTypes.func,
            onLimitAndExpiryChange: PropTypes.func,
            onChangeCreditOption: PropTypes.func,
            additionalFields: PropTypes.shape({
                hasCustomerAdditionalFields: PropTypes.bool,
                customerAdditionalFieldsList: PropTypes.arrayOf(PropTypes.object),
                onChange: PropTypes.func,
                editable: PropTypes.bool,
                disabled: PropTypes.bool,
            }),
            isCashCustomer: PropTypes.bool.isRequired,
            limitExhaustion: PropTypes.number,
        })
    ).isRequired,
    groupLimit: PropTypes.shape({
        current: PropTypes.number,
        exhausted: PropTypes.number,
        new: PropTypes.number,
        old: PropTypes.number,
        wish: PropTypes.number,
    }).isRequired,
    additionalFields: PropTypes.object,
    creditProgram: PropTypes.object,
    parent: PropTypes.oneOf(['creditlimit', 'history', 'approval']).isRequired,
    dateFormat: PropTypes.string.isRequired,
    isContractingStepEditable: PropTypes.bool,
    historyRequestType: PropTypes.oneOf(['LIMIT_EXPIRY', 'LIMIT_REQUEST', 'CREDIT_CORRECTION', 'CONI_REQUEST']),
    isCreditDataInRed: PropTypes.bool,
};
