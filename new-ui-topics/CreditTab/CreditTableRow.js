import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid, { GridItem } from '../../Grid';
import Table from '../../MrcTable';
import Card from '../../Card';
import { FlexRow } from '../../Flex';
import NumberInput from '../../NumberInput';
import MrcCurrency from '../../MrcCurrency';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import CreditTableRowShadow from './CreditTableRowShadow';
import CRLimitSetting from './CRLimitSetting';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
import CreditTableFormSection from './CreditTableFormSection';
import ToggleIndicator from '../../ToggleIndicator';
import CheckCard from '../../CheckCard';
import Select from '../../Select';
import CRPaymentMethodSetting from './CRPaymentMethodSetting';

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

    render() {
        let { isExpanded, isHovered } = this.state;
        let { id, isZebra } = this.props;
        let type = isZebra ? 'zebra' : null;

        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={type}
                    style={{ cursor: 'pointer', '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                    onClick={() => this.toggle()}
                    onMouseEnter={() => this.hover(true)}
                    onMouseLeave={() => this.hover(false)}
                >
                    <Table.D rowSpan="2">
                        <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked isHighlighted />
                    </Table.D>

                    <Table.D colSpan="3" rowSpan="2">
                        <CRTableCellPrepaymentCash name="Prepayment" isBlue />
                    </Table.D>

                    <Table.D colSpan="3">
                        <CRTableCellPrepaymentCash name="Cash" isGreen />
                    </Table.D>
                    <Table.D rowSpan="2" className="fix-width-cell">
                        <ToggleIndicator tilt={isExpanded} />
                    </Table.D>
                </Table.R>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={type}
                    style={{ cursor: 'pointer', '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                    onClick={() => this.toggle()}
                    onMouseEnter={() => this.hover(true)}
                    onMouseLeave={() => this.hover(false)}
                >
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
                    <Table.R
                        sticky={id}
                        style={{ '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                        stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    >
                        <CreditTableRowShadow />
                    </Table.R>
                )}
                {isExpanded && (
                    <Table.R type="form">
                        <Table.D colSpan="8">
                            <CreditTableFormSection
                                title="Payment"
                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt magna aliqua."
                            >
                                <h4 className="mrc-ui-form-label mb-2">Choose Payment Type</h4>
                                <Grid cols={4}>
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
                                <h4 className="mrc-ui-form-label mb-2">Choose Amount</h4>
                                <Grid cols={4}>
                                    <CheckCard title="Current">
                                        <CRLimitSetting limit={4000} limitAfterExpiry={1000} expiryDate="2020-05-06" />
                                    </CheckCard>
                                    <CheckCard title="Customer Wish">
                                        <CRLimitSetting limit={10000} limitAfterExpiry={1000} expiryDate="2020-05-06" />
                                    </CheckCard>
                                    <CheckCard title="CM" checked>
                                        <CRLimitSetting limit={9000} limitAfterExpiry={1000} expiryDate="2020-05-06" />
                                    </CheckCard>
                                    <CheckCard title="New" />
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
                )}
            </React.Fragment>
        );
    }
}

CreditTableRow.propTypes = {
    id: PropTypes.string,
    isZebra: PropTypes.bool,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
