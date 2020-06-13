import React, { Component } from 'react';
import CRPaymentMethodSetting from './CRPaymentMethodSetting';
import NumberInput from '../../NumberInput';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import MrcCurrency from '../../MrcCurrency';
import { FlexRow } from '../../Flex';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Table from '../../MrcTable';
import CRLimitSetting from './CRLimitSetting';
import CreditTableRowShadow from './CreditTableRowShadow';
import { lookup } from '../../Util/translations';
import ClientBlocked from '../../ClientBlocked';
import CheckCard from '../../CheckCard';
import Grid, { GridItem } from '../../Grid';
import CreditTableFormSection from './CreditTableFormSection';

import * as _ from 'lodash';

const translations = {
    blocked: lookup('mrc.status.blocked'),
    customerWish: lookup('mrc.credittab.customerWish'),
    current: lookup('mrc.creditdata.current'),
    old: lookup('mrc.credittab.old'),
    new: lookup('mrc.credittab.new'),
    days: lookup('mrc.credittab.days'),
    choosepayment: lookup('mrc.credittab.choosepayment'),
    chooseamount: lookup('mrc.credittab.chooseamount'),
    chooselimit: lookup('mrc.credittab.chooselimit'),
    chooseexpiry: lookup('mrc.credittab.chooseexpiry'),
    prepayment: lookup('mrc.payment.Prepayment'),
    cash: lookup('mrc.credittab.cash'),
    payment: lookup('mrc.credittab.payment'),
    paymentdescription: lookup('mrc.credittab.paymentdescription'),
    credit: lookup('mrc.creditdata.title'),
    limit: lookup('mrc.credittab.limit'),
    limitdescription: lookup('mrc.credittab.limitdescription'),
    amount: lookup('mrc.attachments.amount'),
    resetLimit: lookup('mrc.credittab.resetLimit'),
    setExpiryDateForAll: lookup('mrc.credittab.setExpiryDateForAll'),
    withoutExpiry: lookup('mrc.credittab.withoutExpiry'),
    expiryDate: lookup('mrc.creditdetails.limitExpiryDate'),
};

export default class ExpandedRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: {
                amount: 'current',
            },
        };
    }

    render() {
        const { customer, isExpanded, id, historical } = this.props;
        return [
            <Table.R
                key="sticky"
                sticky={id}
                style={{ '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
            >
                <CreditTableRowShadow />
            </Table.R>,
            historical ? (
                <Table.R>
                    <Table.D>
                        {lookup('mrc.status.blocked')}
                        <ClientBlocked />
                    </Table.D>
                </Table.R>
            ) : (
                [
                    _.get(customer, 'isBlocked') ? (
                        <Table.R key="blocked">
                            <Table.D>
                                {lookup('mrc.status.blocked')}
                                <ClientBlocked />
                            </Table.D>
                        </Table.R>
                    ) : null,
                    <Table.R key={'rorm'} type="form">
                        <Table.D colSpan="8">
                            <CreditTableFormSection
                                title={translations.payment}
                                description={translations.paymentdescription}
                            >
                                <h4 className="mrc-ui-form-label mb-2">{translations.choosepayment}</h4>
                                <Grid cols={4}>
                                    <CheckCard
                                        title={translations.cash}
                                        checked={customer.type === 'cash'}
                                        onClick={() => customer.makeCashCustomer()}
                                    />
                                    <CheckCard
                                        title={translations.credit}
                                        checked={customer.type === 'credit'}
                                        onClick={() => customer.makeCreditCustomer()}
                                    />
                                </Grid>
                            </CreditTableFormSection>
                            {customer.type === 'credit' ? (
                                <React.Fragment>
                                    <hr />
                                    <CreditTableFormSection
                                        title={translations.limit}
                                        description={translations.limitdescription}
                                    >
                                        <h4 className="mrc-ui-form-label mb-2">{translations.chooseamount}</h4>
                                        <Grid cols={4}>
                                            <CheckCard
                                                title={translations.current}
                                                checked={this.state.checked.amount === 'current'}
                                                onClick={() => this.setState({ checkedAmount: 'current' })}
                                            >
                                                <CRLimitSetting
                                                    limit={_.get(customer, 'limit.current.amount')}
                                                    limitAfterExpiry={_.get(customer, 'limit.expiry.amount')}
                                                    expiryDate={_.get(customer, 'limit.expiry.date')}
                                                />
                                            </CheckCard>
                                            <CheckCard
                                                title={translations.new}
                                                checked={this.state.checked.amount === 'new'}
                                                onClick={() => this.setState({ checkedAmount: 'new' })}
                                            >
                                                <CRLimitSetting
                                                    limit={_.get(customer, 'limit.wish.amount')}
                                                    limitAfterExpiry={_.get(customer, 'limit.expiry.amount')}
                                                    expiryDate={_.get(customer, 'limit.expiry.date')}
                                                />
                                            </CheckCard>
                                        </Grid>
                                        {this.state.checkedAmount === 'new' ? (
                                            <React.Fragment>
                                                <h4 className="mrc-ui-form-label mt-5 mb-2">
                                                    {translations.chooselimit}
                                                </h4>
                                                <Card dropShadow>
                                                    <h4 className="mrc-ui-form-label mb-1">{translations.amount}</h4>
                                                    <Grid cols={3}>
                                                        <FlexRow alignItems="baseline">
                                                            <div className="mr-3">
                                                                <NumberInput />
                                                            </div>
                                                            <MrcCurrencySymbol />
                                                        </FlexRow>
                                                    </Grid>
                                                    <h4 className="mrc-ui-form-label mt-4 mb-1">
                                                        {translations.chooseexpiry}
                                                    </h4>
                                                    <Grid cols={3}>
                                                        <CheckCard title={translations.withoutExpiry} checked />
                                                        <CheckCard title="Date of Expiry" checked>
                                                            <NumberInput />
                                                        </CheckCard>
                                                        <GridItem alignSelf="center">
                                                            <a>{translations.setExpiryDateForAll}</a>
                                                        </GridItem>
                                                    </Grid>
                                                    <h4 className="mrc-ui-form-label mt-4 mb-2">
                                                        {translations.resetLimit}
                                                    </h4>
                                                    <Grid cols={3}>
                                                        <CheckCard checked>
                                                            <MrcCurrency type="large-bold">0</MrcCurrency>
                                                        </CheckCard>
                                                        <CheckCard>
                                                            <MrcCurrency type="large-bold">
                                                                {_.get(customer, 'limit.current.amount')}
                                                            </MrcCurrency>
                                                        </CheckCard>
                                                        <CheckCard>
                                                            <FlexRow alignItems="baseline">
                                                                <div className="mr-3">
                                                                    <NumberInput />
                                                                </div>
                                                                <MrcCurrencySymbol type="small" />
                                                            </FlexRow>
                                                        </CheckCard>
                                                    </Grid>
                                                </Card>
                                            </React.Fragment>
                                        ) : null}
                                    </CreditTableFormSection>
                                    <hr />
                                    <CreditTableFormSection
                                        title="Payment Method"
                                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod magna aliqua."
                                    >
                                        <h4 className="mrc-ui-form-label mt-0 mb-2">Choose New Limit</h4>
                                        <Card dropShadow>
                                            <h4 className="mrc-ui-form-label mb-2">Choose Amount</h4>
                                            <Grid cols={4}>
                                                <CheckCard title="Current" />
                                                <CheckCard title="Customer Wish" />
                                                <CheckCard title="CM" />
                                                <CheckCard title="New" checked />
                                            </Grid>
                                            <h4 className="mrc-ui-form-label mt-4 mb-2">Creditperiod</h4>
                                            <h4 className="mrc-ui-form-label mt-4 mb-2">Choose Expiry</h4>
                                            <Grid cols={3}>
                                                <CheckCard title="Without Expiry" checked />
                                                <CheckCard title="Date of Expiry" checked>
                                                    <NumberInput />
                                                </CheckCard>
                                                <GridItem alignSelf="center">
                                                    <a>set date of expiry to all customers payments</a>
                                                </GridItem>
                                            </Grid>
                                            <h4 className="mrc-ui-form-label mt-4 mb-2">Set Limit after expiry to</h4>
                                            <Grid cols={4}>
                                                <CheckCard title="Current">
                                                    <CRPaymentMethodSetting
                                                        product="Bank Transfer"
                                                        period="14 Days"
                                                        directDebit="Basislastschrift"
                                                    />
                                                </CheckCard>
                                                <CheckCard title="Customer Wish">
                                                    <CRPaymentMethodSetting product="Bank Transfer" period="14 Days" />
                                                </CheckCard>
                                                <CheckCard title="CM" checked>
                                                    <CRPaymentMethodSetting
                                                        product="Bank Transfer"
                                                        period="14 Days"
                                                        directDebit="Basislastschrift"
                                                    />
                                                </CheckCard>
                                                {/* <CheckCard title="New" /> */}
                                            </Grid>
                                        </Card>
                                    </CreditTableFormSection>
                                </React.Fragment>
                            ) : null}
                        </Table.D>
                    </Table.R>,
                ]
            ),
        ];
    }
}

ExpandedRow.propTypes = {
    makeCashCustomer: PropTypes.func,
    makeCreditCustomer: PropTypes.func,
    isExpanded: PropTypes.bool,
    id: PropTypes.string,
    historical: PropTypes.bool,
    isCashCustomer: PropTypes.bool,
    country: PropTypes.string,
    isZebra: PropTypes.bool,
    customer: PropTypes.object,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
