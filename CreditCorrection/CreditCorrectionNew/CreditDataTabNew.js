import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../tabs.scss';
import './index.scss';
import * as _ from 'lodash';
import CreditCorrectionGroupActions from '../../new-ui-topics/CreditCorrection/CreditCorrectionGroupActions';
import { quickGroupActions as groupActions } from '../../new-ui-topics/CreditCorrection/creditCorrectionEntities';
import Table from '../../MrcTable';
import CreditCorrectionTableHead from '../../new-ui-topics/CreditCorrection/CreditCorrectionTableHead';
import CreditCorrectionTableRow from '../../new-ui-topics/CreditCorrection/CreditCorrectionTableRow';
import MainContent from '../../MainContent';
import { countryBlockingOptions, setOnCustomerBlockingOptions } from './blockingOptions';
import { lookup } from '../../Util/translations';

export default class CreditDataTabNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditDataValid: false,
            creditDataComponentsValid: {},
            currentGroupLimit: 0,
            availableGroupLimit: 0,
            exhaustionGroupLimit: 0,
            requestedGroupLimit: 0,
            blockingValues: {},
            blockingCallbacks: {},
            selectedGroupAction: groupActions.customerLevel,
        };

        //when we block a customer, the payment doesn't change in MCFM and we need to invalidate it manually
        if (
            this.props.request.data &&
            this.props.request.data.requestedItems &&
            this.props.request.data.requestedItems[0].customer &&
            this.props.request.data.requestedItems[0].customer.creditLimitStatus === 'blocked'
        ) {
            this.props.request.data.requestedItems.map((item) => {
                item.creditData.id = '';
                item.creditData.creditProduct = '';
                item.creditData.creditPeriod = '';
                item.creditData.debitType = '';
            });
        }
    }

    handleChangeGroupAction(value) {
        this.setState({ selectedGroupAction: value });
    }

    markRequestedCustomer(reqCust, cust) {
        if (
            reqCust.country === cust.country &&
            reqCust.storeNumber === cust.storeNumber &&
            reqCust.customerNumber === cust.customerNumber
        ) {
            cust.requestedCustomer = true;
        }
    }

    createBlockingOptions(country) {
        if (countryBlockingOptions[country]) {
            return [setOnCustomerBlockingOptions, ...countryBlockingOptions[country]].map((item) => {
                item.label = lookup(item.translationKey);
                return item;
            });
        }

        return [setOnCustomerBlockingOptions].map((item) => {
            item.label = lookup(item.translationKey);
            return item;
        });
    }

    prepareRequestedItems(req) {
        //
        // mark the requested customer
        //
        req.requestedItems.forEach((ri) => this.markRequestedCustomer(req.requestedCustomerId, ri.customer));

        //
        // sort by customerID, taking the requestedCustomer first
        //
        req.requestedItems.sort((a, b) => {
            const custa = a.customer;
            const custb = b.customer;
            if (custa.requestedCustomer) return -1;
            if (custb.requestedCustomer) return 1;

            if (custa.storeNumber !== custb.storeNumber) {
                return Number.parseInt(custa.storeNumber) - Number.parseInt(custb.storeNumber);
            }

            return Number.parseInt(custa.customerNumber) - Number.parseInt(custb.customerNumber);
        });
    }

    createHeaderProps(req) {
        let currentGroupLimit = 0;
        let requestedGroupLimit = 0;
        let exhaustionGroupLimit = 0;
        let countryCode = undefined;
        req.requestedItems.map((item) => {
            countryCode = item.customer.country;
            currentGroupLimit += item.customer.creditLimit !== undefined ? item.customer.creditLimit : 0;
            const amount =
                !_.isNil(item.creditData.amount) && !_.isNaN(item.creditData.amount)
                    ? item.creditData.amount
                    : !_.isNil(item.customer.creditLimit)
                    ? item.customer.creditLimit
                    : 0;
            requestedGroupLimit += amount;
            exhaustionGroupLimit += item.customer.limitExhaustion !== undefined ? item.customer.limitExhaustion : 0;
        });
        return {
            countryCode: countryCode,
            groupLimit: {
                current: currentGroupLimit,
                wish: requestedGroupLimit,
                exhausted: exhaustionGroupLimit,
            },
        };
    }

    render() {
        if (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems) {
            return null;
        }
        let { selectedGroupAction } = this.state;
        const requestData = this.props.request.data;

        this.prepareRequestedItems(requestData);
        requestData.requestedItems.map((item) => console.log(this.createBlockingOptions(item.customer.country)));
        return (
            <MainContent>
                <CreditCorrectionGroupActions
                    groupActions={groupActions}
                    selectedGroupAction={selectedGroupAction}
                    onChange={this.handleChangeGroupAction.bind(this)}
                />
                <Table.Root fixedLayout>
                    <Table.Body>
                        <CreditCorrectionTableHead {...this.createHeaderProps(requestData)} />
                        {requestData.requestedItems.map((e, i) => (
                            <CreditCorrectionTableRow
                                key={i}
                                id={'credit-table-sticky-row-' + i}
                                isZebra={!!(i % 2)}
                                quickGroupAction={selectedGroupAction}
                            />
                        ))}
                    </Table.Body>
                </Table.Root>
            </MainContent>
        );
    }
}

CreditDataTabNew.propTypes = {
    request: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.shape({
            activated: PropTypes.bool,
            canBlock: PropTypes.bool,
            canCorrect: PropTypes.bool,

            requestedItems: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    customer: PropTypes.shape({
                        country: PropTypes.string,
                        storeNumber: PropTypes.string,
                        customerNumber: PropTypes.string,
                        customerFirstName: PropTypes.string,
                        customerLastName: PropTypes.string,
                        requestedCustomer: PropTypes.bool,
                        limitExhaustion: PropTypes.number,
                        creditLimit: PropTypes.number,
                        creditLimitStatus: PropTypes.string,
                        currentPayment: PropTypes.shape({
                            creditProduct: PropTypes.string,
                            creditPeriod: PropTypes.string,
                            debitType: PropTypes.string,
                        }),
                        availablePayments: PropTypes.arrayOf(
                            PropTypes.shape({
                                creditProduct: PropTypes.string,
                                creditPeriod: PropTypes.string,
                                debitType: PropTypes.string,
                            })
                        ),
                    }),
                    creditData: PropTypes.shape({
                        id: PropTypes.string,
                        amount: PropTypes.number,
                        initialAmount: PropTypes.number,
                        creditProduct: PropTypes.string,
                        creditPeriod: PropTypes.string,
                        debitType: PropTypes.string,
                        blockingOption: PropTypes.string,
                    }),
                    activationInfo: PropTypes.shape({
                        resultCode: PropTypes.string,
                        resultMessage: PropTypes.string,
                        resultStatus: PropTypes.string,
                    }),
                })
            ),
        }),
    }),
    onCreditDataValidChange: PropTypes.func,
    setCreditData: PropTypes.func,
};
