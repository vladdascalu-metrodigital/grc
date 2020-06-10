import React, { Component } from 'react';
import Table from '../../MrcTable';
import NumberInput from '../../NumberInput';
import MrcCurrency from '../../MrcCurrency';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import CRLimitSetting from './CRLimitSetting';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
import CreditTableFormSection from './CreditTableFormSection';
import ClientBlocked from '../../ClientBlocked';
import ToggleIndicator from '../../ToggleIndicator';
import CheckCard from '../../CheckCard';
import Select from '../../Select';
import CRPaymentMethodSetting from './CRPaymentMethodSetting';
import CreditTableRowShadow from './CreditTableRowShadow';
import { lookup } from '../../Util/translations';
import Grid, { GridItem } from '../../Grid';
import Card from '../../Card';
import { FlexRow } from '../../Flex';

import * as _ from 'lodash';

const translations = {
    blocked: lookup('mrc.status.blocked'),
    customerWish: lookup('mrc.credittab.customerWish'),
    current: lookup('mrc.creditdata.current'),
    old: lookup('mrc.credittab.old'),
    new: lookup('mrc.credittab.new'),
    days: lookup('mrc.credittab.days'),
    choosepayment: lookup('mrc.credittab.choosepayment'),
    prepayment: lookup('mrc.payment.Prepayment'),
    cash: lookup('mrc.credittab.cash'),
    payment: lookup('mrc.credittab.payment'),
    paymentdescription: lookup('mrc.credittab.paymentdescription'),
    credit: lookup('mrc.creditdata.title'),
    limit: lookup('mrc.credittab.limit'),
    limitdescription: lookup('mrc.credittab.limitdescription'),
    chooseamount: lookup('mrc.credittab.chooseamount'),
};

export default class CreditTableRowA extends Component {
    render() {
        const {
            customer,
            isExpanded,
            country,
            isHovered,
            id,
            canToggle,
            type,
            historical,
            isCashCustomer,
            onExpand,
            onHover,
        } = this.props;
        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={type}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    <Table.D>
                        {customer ? (
                            <CRTableCellCustomer
                                name={customer.name}
                                number={[customer.storeNumber, customer.number].join('/')}
                                isBlocked={customer.isBlocked}
                                isHighlighted
                            />
                        ) : null}
                    </Table.D>

                    <Table.D>
                        <CRTableCellPrepaymentCash name={translations.prepayment} isBlue />
                    </Table.D>

                    <Table.D>
                        <CRTableCellPrepaymentCash name={translations.cash} />
                    </Table.D>

                    <Table.D>
                        <CRTableCellLimit
                            country={country}
                            exhausted={null}
                            limit={_.get(customer, 'limit.current.amount')}
                            isGreen
                        />
                    </Table.D>

                    <Table.D>
                        <CRTableCellExpiry
                            expiryLimit={_.get(customer, 'limit.expiry.amount')}
                            expiryDate={_.get(customer, 'limit.expiry.date')}
                            isGreen
                        />
                    </Table.D>

                    <Table.D borderFix>
                        <CRTableCellCreditProduct
                            productName={_.get(customer, 'limit.current.product')}
                            productTimePeriod={[_.get(customer, 'limit.current.period'), translations.days].join(' ')}
                            productPaymentMethod={_.get(customer, 'limit.current.method')}
                            isGreen
                        />
                    </Table.D>

                    <Table.D>
                        <ToggleIndicator tilt={isExpanded} />
                    </Table.D>
                </Table.R>
                {isExpanded && (
                    <Table.R
                        sticky={id}
                        style={{ '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                        stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    >
                        <CreditTableRowShadow />
                    </Table.R>
                )}
                {isExpanded &&
                    (historical ? (
                        <Table.R>
                            <Table.D>
                                {lookup('mrc.status.blocked')}
                                <ClientBlocked />
                            </Table.D>
                        </Table.R>
                    ) : (
                        <Table.R type="form">
                            <Table.D colSpan="8">
                                <CreditTableFormSection
                                    title={translations.payment}
                                    description={translations.paymentdescription}
                                >
                                    <h4 className="mrc-ui-form-label mb-2">{translations.choosepayment}</h4>
                                    <Grid cols={4}>
                                        <CheckCard
                                            title={translations.cash}
                                            checked={isCashCustomer}
                                            onClick={() => alert('todo: cash')}
                                        />
                                        <CheckCard
                                            title={translations.credit}
                                            checked={!isCashCustomer}
                                            onClick={() => alert('todo: credit')}
                                        />
                                    </Grid>
                                </CreditTableFormSection>
                                <hr />
                                <CreditTableFormSection
                                    title={translations.limit}
                                    description={translations.limitdescription}
                                >
                                    <h4 className="mrc-ui-form-label mb-2">{translations.chooseamount}</h4>
                                    <Grid cols={4}>
                                        <CheckCard title={translations.current}>
                                            <CRLimitSetting
                                                limit={_.get(customer, 'limit.current.amount')}
                                                limitAfterExpiry={_.get(customer, 'limit.expiry.amount')}
                                                expiryDate={_.get(customer, 'limit.expiry.date')}
                                            />
                                        </CheckCard>
                                        <CheckCard
                                            title={translations.customerWish}
                                            checked
                                            onClick={() => alert('todo: change amount')}
                                        >
                                            <CRLimitSetting
                                                limit={_.get(customer, 'limit.wish.amount')}
                                                limitAfterExpiry={_.get(customer, 'limit.expiry.amount')}
                                                expiryDate={_.get(customer, 'limit.expiry.date')}
                                            />
                                        </CheckCard>
                                    </Grid>
                                    <h4 className="mrc-ui-form-label mt-5 mb-2">Choose New Limit</h4>
                                    <Card dropShadow>
                                        <h4 className="mrc-ui-form-label mb-1">Amount</h4>
                                        <Grid cols={3}>
                                            <FlexRow alignItems="baseline">
                                                <div className="mr-3">
                                                    <NumberInput />
                                                </div>
                                                <MrcCurrencySymbol />
                                            </FlexRow>
                                        </Grid>
                                        <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Expiry</h4>
                                        <Grid cols={3}>
                                            <CheckCard title="Without Expiry" checked />
                                            <CheckCard title="Date of Expiry" checked>
                                                <NumberInput />
                                            </CheckCard>
                                            <GridItem alignSelf="center">
                                                <a>set date of expiry to all customers limits</a>
                                            </GridItem>
                                        </Grid>
                                        <h4 className="mrc-ui-form-label mt-4 mb-2">Set Limit after expiry to</h4>
                                        <Grid cols={3}>
                                            <CheckCard checked>
                                                <MrcCurrency type="large-bold">123</MrcCurrency>
                                            </CheckCard>
                                            <CheckCard>
                                                <MrcCurrency type="large-bold">6000</MrcCurrency>
                                            </CheckCard>
                                            <CheckCard checked>
                                                <FlexRow alignItems="baseline">
                                                    <div className="mr-3">
                                                        <NumberInput />
                                                    </div>
                                                    <MrcCurrencySymbol type="small" />
                                                </FlexRow>
                                            </CheckCard>
                                        </Grid>
                                    </Card>
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
                                        <Select />
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
                            </Table.D>
                        </Table.R>
                    ))}
            </React.Fragment>
        );
    }
}
