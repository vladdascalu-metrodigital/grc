import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../../Grid';
import Table from '../../MrcTable';
import Card from '../../Card';
import { FlexRow } from '../../Flex';
import NumberInput from '../../NumberInput';
// import MrcCurrency from '../../MrcCurrency';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import CreditCorrectionTableRowShadow from './CreditCorrectionTableRowShadow';
// import CRLimitSetting from './CRLimitSetting';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
// import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
import FormSection from './FormSection';
import ToggleIndicator from '../../ToggleIndicator';
import CheckCard from '../../CheckCard';
import Select from '../../Select';
// import CRPaymentMethodSetting from './CRPaymentMethodSetting';

export default class CreditCorrectionTableRow extends Component {
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
                    <Table.D>
                        <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked isHighlighted />
                    </Table.D>

                    <Table.D colSpan="3">
                        <CRTableCellPrepaymentCash name="Prepayment" isBlue />
                    </Table.D>

                    <Table.D>
                        <CRTableCellLimit country="EUR" limit="30000" isGreen />
                    </Table.D>
                    <Table.D borderFix>
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="14 Days"
                            productPaymentMethod="Direct Debit 1"
                            isGreen
                        />
                    </Table.D>
                    <Table.D className="fix-width-cell">
                        <ToggleIndicator tilt={isExpanded} />
                    </Table.D>
                </Table.R>
                {isExpanded && (
                    <Table.R
                        sticky={id}
                        style={{ '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                        stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    >
                        <CreditCorrectionTableRowShadow />
                    </Table.R>
                )}
                {isExpanded && (
                    <Table.R type="form">
                        <Table.D colSpan="7">
                            <FormSection
                                title="Quick Action"
                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            >
                                <h4 className="mrc-ui-form-label mb-2">Choose Action</h4>
                                <Grid cols={4}>
                                    <CheckCard title="No Changes" />
                                    <CheckCard title="Limit" checked />
                                    <CheckCard title="Blocking" />
                                    <CheckCard title="Remove Block" />
                                </Grid>
                                <h4 className="mrc-ui-form-label mt-5 mb-2">Choose Limit Option</h4>
                                <Card dropShadow>
                                    <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Limit</h4>
                                    <Grid cols={4}>
                                        <CheckCard title="Amount" checked>
                                            <FlexRow alignItems="baseline">
                                                <div className="mr-3">
                                                    <NumberInput />
                                                </div>
                                                <MrcCurrencySymbol type="small" />
                                            </FlexRow>
                                        </CheckCard>
                                        <CheckCard title="Remove Limit" />
                                    </Grid>
                                    <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Credit Product</h4>
                                    <Grid cols={4}>
                                        <CheckCard title="Metro Top" checked />
                                        <CheckCard title="Bank Transfer" />
                                        <CheckCard title="Direct Debit" />
                                    </Grid>

                                    <Grid cols={4} className="mt-4">
                                        <Select
                                            label="Creditperiod"
                                            options={[
                                                ['NULL', 'Please Choose'],
                                                ['1', 'Option 1'],
                                                ['2', 'Option 2'],
                                                ['3', 'Option 3'],
                                                ['4', 'Option 4'],
                                            ]}
                                            value={null}
                                            onChange={null}
                                        />
                                    </Grid>
                                </Card>
                            </FormSection>
                        </Table.D>
                    </Table.R>
                )}
            </React.Fragment>
        );
    }
}

CreditCorrectionTableRow.propTypes = {
    id: PropTypes.string,
    isZebra: PropTypes.bool,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
