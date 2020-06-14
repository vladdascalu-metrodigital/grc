import React, { Component } from 'react';
import Select from '../../Select';
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
    choosepaymentmethod: lookup('mrc.credittab.choosepaymentmethod'),
    chooseamount: lookup('mrc.credittab.chooseamount'),
    chooselimit: lookup('mrc.credittab.chooselimit'),
    chooseexpiry: lookup('mrc.credittab.chooseexpiry'),
    chooseproduct: lookup('mrc.credittab.chooseproduct'),
    choosedebittype: lookup('mrc.credittab.choosedebittype'),
    creditperiod: lookup('mrc.creditdetails.creditperiod'),
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

// Compare two translations keys (strings).
// * If the translations of the keys can be parsed into integers, compare the parsed integers.
// * If only one of the translations can be parsed into an integer, return the unparsed one is considered smaller.
// * If both translations can be parsed into integers, compare the integers.
const compareTranslationKeys = (sx, sy) => {
    const x = _.parseInt(lookup(sx));
    const y = _.parseInt(lookup(sy));
    return _.isNaN(x) && _.isNaN(y) ? sx.localeCompare(sy) : _.isNaN(x) ? -1 : _.isNaN(y) ? 1 : x - y;
};

export default class ExpandedRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: {
                customerType: props.customer.type,
                amount: 'current',
                resetPayment: 'current',
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
                                        checked={this.state.checked.customerType === 'cash'}
                                        onClick={() => {
                                            this.setState({ checked: { ...this.state.checked, customerType: 'cash' } });
                                            customer.makeCashCustomer();
                                        }}
                                    />
                                    <CheckCard
                                        title={translations.credit}
                                        checked={this.state.checked.customerType === 'credit'}
                                        onClick={() => {
                                            this.setState({
                                                checked: { ...this.state.checked, customerType: 'credit' },
                                            });
                                            customer.makeCreditCustomer();
                                        }}
                                    />
                                </Grid>
                            </CreditTableFormSection>
                            {this.state.checked.customerType === 'credit' ? (
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
                                                onClick={() =>
                                                    this.setState({
                                                        checked: { ...this.state.checked, amount: 'current' },
                                                    })
                                                }
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
                                                onClick={() =>
                                                    this.setState({ checked: { ...this.state.checked, amount: 'new' } })
                                                }
                                            >
                                                <CRLimitSetting
                                                    limit={_.get(customer, 'limit.wish.amount')}
                                                    limitAfterExpiry={_.get(customer, 'limit.expiry.amount')}
                                                    expiryDate={_.get(customer, 'limit.expiry.date')}
                                                />
                                            </CheckCard>
                                        </Grid>
                                        {this.state.checked.amount === 'new' ? (
                                            <React.Fragment>
                                                <h4 className="mrc-ui-form-label mt-5 mb-2">
                                                    {translations.chooselimit}
                                                </h4>
                                                <Card dropShadow>
                                                    <h4 className="mrc-ui-form-label mb-1">{translations.amount}</h4>
                                                    <Grid cols={3}>
                                                        <FlexRow alignItems="baseline">
                                                            <div className="mr-3">
                                                                <NumberInput
                                                                    onChange={x => customer.onAmountChange(x)}
                                                                />
                                                            </div>
                                                            <MrcCurrencySymbol />
                                                        </FlexRow>
                                                    </Grid>
                                                    <h4 className="mrc-ui-form-label mt-4 mb-1">
                                                        {translations.chooseexpiry}
                                                    </h4>
                                                    <Grid cols={3}>
                                                        <CheckCard title={translations.withoutExpiry} checked />
                                                        <CheckCard title={translations.expiryDate}>
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
                                        title={translations.payment}
                                        description={translations.paymentdescription}
                                    >
                                        <h4 className="mrc-ui-form-label mt-0 mb-2">
                                            {translations.choosepaymentmethod}
                                        </h4>
                                        <Card dropShadow>
                                            <h4 className="mrc-ui-form-label mb-2">{translations.chooseproduct}</h4>
                                            <Grid cols={4}>
                                                {_.get(customer, 'payments.products')
                                                    ? _.get(customer, 'payments.products')
                                                          .sort(compareTranslationKeys)
                                                          .map(x => (
                                                              <CheckCard
                                                                  key={x}
                                                                  title={lookup(x)}
                                                                  checked={
                                                                      _.get(customer, 'limit.current.product') === x
                                                                  }
                                                              />
                                                          ))
                                                    : null}
                                            </Grid>
                                            <h4 className="mrc-ui-form-label mt-0 mb-2">
                                                {translations.choosedebittype}
                                            </h4>
                                            <Grid cols={4}>
                                                {_.get(customer, 'payments.debittypes')
                                                    ? _.get(customer, 'payments.debittypes')
                                                          .sort(compareTranslationKeys)
                                                          .map(x => (
                                                              <CheckCard
                                                                  key={x}
                                                                  title={lookup(x)}
                                                                  checked={
                                                                      _.get(customer, 'limit.current.debittype') === x
                                                                  }
                                                              />
                                                          ))
                                                    : null}
                                            </Grid>
                                            <h4 className="mrc-ui-form-label mt-4 mb-2">{translations.creditperiod}</h4>
                                            <Select
                                                options={
                                                    _.get(customer, 'payments.periods')
                                                        ? _.get(customer, 'payments.periods')
                                                              .sort(compareTranslationKeys)
                                                              .map(x => lookup(x))
                                                        : null
                                                }
                                            />
                                            <h4 className="mrc-ui-form-label mt-4 mb-2">{translations.chooseexpiry}</h4>
                                            <Grid cols={3}>
                                                <CheckCard title={translations.withoutExpiry} checked />
                                                <CheckCard title={translations.expiryDate}>
                                                    <NumberInput />
                                                </CheckCard>
                                                <GridItem alignSelf="center">
                                                    <a>{translations.setExpiryDateForAll}</a>
                                                </GridItem>
                                            </Grid>
                                            <h4 className="mrc-ui-form-label mt-4 mb-2">Set Limit after expiry to</h4>
                                            <Grid cols={4}>
                                                <CheckCard
                                                    title={translations.current}
                                                    checked={this.state.checked.resetPayment === 'current'}
                                                >
                                                    <CRPaymentMethodSetting
                                                        product={_.get(customer, 'limit.current.product')}
                                                        period={_.get(customer, 'limit.current.period')}
                                                        directDebit={_.get(customer, 'limit.current.debittype')}
                                                    />
                                                </CheckCard>
                                                <CheckCard
                                                    title={translations.customerWish}
                                                    checked={this.state.checked.resetPayment === 'customerWish'}
                                                >
                                                    <CRPaymentMethodSetting
                                                        product={_.get(customer, 'limit.wish.product')}
                                                        period={_.get(customer, 'limit.wish.period')}
                                                        directDebit={_.get(customer, 'limit.wish.debittype')}
                                                    />
                                                </CheckCard>
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
    onAmountChange: PropTypes.func,
    isExpanded: PropTypes.bool,
    id: PropTypes.string,
    historical: PropTypes.bool,
    country: PropTypes.string,
    isZebra: PropTypes.bool,
    customer: PropTypes.object,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
