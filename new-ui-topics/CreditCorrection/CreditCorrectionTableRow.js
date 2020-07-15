import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '../../MrcTable';
// import MrcCurrency from '../../MrcCurrency';
import CreditCorrectionTableRowShadow from '../CreditTablesCommons/CreditCorrectionTableRowShadow';
// import CRLimitSetting from './CRLimitSetting';
import CRTableCellCustomer from '../CreditTablesCommons/CRTableCellCustomer';
import CRTableCellLimit from '../CreditTablesCommons/CRTableCellLimit';
// import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from '../CreditTablesCommons/CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from '../CreditTablesCommons/CRTableCellPrepaymentCash';
import ToggleIndicator from '../../ToggleIndicator';
// import CRPaymentMethodSetting from './CRPaymentMethodSetting';

import CreditCorrectionTableRowForm from './CreditCorrectionTableRowForm';
import CreditCorrectionTableRowFormLocked from './CreditCorrectionTableRowFormLocked';
import { FlexRow } from '../../Flex';

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
        let { id, isZebra, quickGroupAction } = this.props;
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
                        <FlexRow alignItems="center">
                            <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked isHighlighted />
                            {quickGroupAction && <span>{quickGroupAction.label}</span>}
                        </FlexRow>
                    </Table.D>

                    <Table.D colSpan="3">
                        <CRTableCellPrepaymentCash name="Prepayment" isBlue />
                    </Table.D>

                    <Table.D>
                        <CRTableCellLimit country="EUR" limit="30000" isGreen />
                    </Table.D>
                    <Table.D>---</Table.D>
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
                    <React.Fragment>
                        <Table.R
                            sticky={id}
                            style={{ '--sticky-override': isExpanded ? 'sticky' : 'static' }}
                            stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                        >
                            <CreditCorrectionTableRowShadow />
                        </Table.R>
                        <Table.R type="form">
                            <Table.D colSpan="8">
                                {quickGroupAction ? (
                                    <CreditCorrectionTableRowFormLocked quickGroupAction={quickGroupAction} />
                                ) : (
                                    <CreditCorrectionTableRowForm />
                                )}
                            </Table.D>
                        </Table.R>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

CreditCorrectionTableRow.propTypes = {
    id: PropTypes.string,
    isZebra: PropTypes.bool,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    quickGroupAction: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
    }),
};
