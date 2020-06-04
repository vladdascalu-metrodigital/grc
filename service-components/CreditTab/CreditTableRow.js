import React, { Component } from 'react';

import Grid from '../../Grid';
import Table from '../../MrcTable';
import Card, { TYPE as CTYPE } from '../../Card';
import NumberInput from '../../NumberInput';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
import CreditTableFormSection from './CreditTableFormSection';
import ToggleIndicator from '../../ToggleIndicator';
import CheckCard from '../../CheckCard';

export default class CreditTableRow extends Component {
    constructor(props) {
        super(props);
        this.toggle.bind(this);
        this.state = {
            isExpanded: false,
        };
    }

    toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    render() {
        let { isExpanded } = this.state;
        return (
            <Table.Body>
                <Table.R isActive={isExpanded}>
                    <Table.D rowSpan="2">
                        <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked isHighlighted />
                    </Table.D>

                    <Table.D colSpan="3" rowSpan="2">
                        <CRTableCellPrepaymentCash name="Prepayment" isBlue />
                    </Table.D>

                    <Table.D colSpan="3">
                        <CRTableCellPrepaymentCash name="Cash" isGreen />
                    </Table.D>
                    <Table.D rowSpan="2">
                        <div onClick={() => this.toggle()}>
                            <ToggleIndicator tilt={isExpanded} />
                        </div>
                    </Table.D>
                </Table.R>
                <Table.R isActive={isExpanded}>
                    <Table.D>
                        <CRTableCellLimit country="EUR" exhausted="22000" limit="30000" isGreen />
                    </Table.D>
                    <Table.D>
                        <CRTableCellExpiry expiryLimit="10000" expiryDate="4/2/2020" isGreen />
                    </Table.D>
                    <Table.D borderFix>
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="14 Days"
                            productPaymentMethod="Direct Debit 1"
                            isGreen
                        />
                    </Table.D>
                </Table.R>
                {isExpanded && (
                    <Table.R>
                        <Table.D colSpan="8">
                            <CreditTableFormSection
                                title="Payment"
                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt magna aliqua."
                            >
                                <h4>Choose Payment Type</h4>
                                <Grid cols="4">
                                    <CheckCard title="Cash" />
                                    <CheckCard title="Credit" checked />
                                    <CheckCard title="Prepayment" />
                                </Grid>
                            </CreditTableFormSection>
                            <hr />
                            <CreditTableFormSection
                                title="Payment"
                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            >
                                <h4>Choose Amount</h4>
                                <Grid cols="4">
                                    <CheckCard title="Current" />
                                    <CheckCard title="Customer Wish" />
                                    <CheckCard title="CM" />
                                    <CheckCard title="New" checked />
                                </Grid>
                                <h4>Choose New Limit</h4>
                                <Card dropShadow>
                                    <h4>Amount</h4>
                                    <NumberInput /> EUR
                                    <h4>Choose Expiry</h4>
                                    <Grid cols="3">
                                        <CheckCard title="Without Expiry" />
                                        <CheckCard title="Date of Expiry">
                                            <NumberInput />
                                        </CheckCard>
                                        <a>set date of expiry to all customers limits</a>
                                    </Grid>
                                    <h4>Set Limit after expiry to</h4>
                                    <Grid cols="3">
                                        <CheckCard title="0 EUR" />
                                        <CheckCard title="6.000 EUR" />
                                        <Card type={CTYPE.MUTED}>
                                            <NumberInput /> EUR
                                        </Card>
                                    </Grid>
                                </Card>
                            </CreditTableFormSection>
                            <hr />
                            <CreditTableFormSection
                                title="Payment Method"
                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod magna aliqua."
                            >
                                <h4>Choose Amount</h4>
                                <Grid cols="4">
                                    <CheckCard title="Current" />
                                    <CheckCard title="Customer Wish" />
                                    <CheckCard title="CM" />
                                    <CheckCard title="New" checked />
                                </Grid>
                            </CreditTableFormSection>
                        </Table.D>
                    </Table.R>
                )}
            </Table.Body>
        );
    }
}
