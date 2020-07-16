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
import CTableCellBiggerText from '../CreditTablesCommons/CTableCellBiggerText';
import ToggleIndicator from '../../ToggleIndicator';
// import CRPaymentMethodSetting from './CRPaymentMethodSetting';

import CreditCorrectionTableRowForm from './CreditCorrectionTableRowForm';
import CreditCorrectionTableRowFormLocked from './CreditCorrectionTableRowFormLocked';

import { correctionActions, creditProducts, creditPeriodOptions, quickGroupActions } from './creditCorrectionEntities';

export default class CreditCorrectionTableRow extends Component {
    constructor(props) {
        super(props);
        this.toggle.bind(this);
        this.hover.bind(this);
        this.state = {
            isHovered: false,
            isExpanded: false,
            formData: {
                selectedAction: correctionActions.limit,
                limitAmount: 999,
                removeLimit: false,
                selectedCreditProduct: creditProducts.metroTop,
                selectedCreditPeriod: creditPeriodOptions[0][0],
            },
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

    handleFormChange(formDataChange) {
        this.setState({
            formData: {
                ...this.state.formData,
                ...formDataChange,
            },
        });
    }

    // getselectedAction() {
    //     let { quickGroupAction } = this.props;
    //     let { selectedAction } = this.state.formData;
    //     if (quickGroupAction && quickGroupAction.id !== quickGroupActions.customerLevel.id) {
    //         return quickGroupAction;
    //     }
    //     return selectedAction;
    // }

    render() {
        let { isExpanded, isHovered, formData } = this.state;
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
                        <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked isHighlighted />
                    </Table.D>

                    <Table.D colSpan="3">
                        <CTableCellBiggerText text="Prepayment" color="blue" />
                    </Table.D>

                    {quickGroupAction.id === quickGroupActions.customerLevel.id ? (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country="EUR"
                                    limit={formData.removeLimit ? 0 : formData.limitAmount}
                                    isGreen
                                />
                            </Table.D>
                            <Table.D>---</Table.D>
                            <Table.D>
                                <CRTableCellCreditProduct
                                    productName={formData.selectedCreditProduct.label}
                                    productTimePeriod="14 Days"
                                    productPaymentMethod="Direct Debit 1"
                                    isGreen
                                />
                            </Table.D>
                        </React.Fragment>
                    ) : (
                        <Table.D colSpan="3">
                            <CTableCellBiggerText text={quickGroupAction.label} color="green" />
                        </Table.D>
                    )}

                    <Table.D>
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
                                {quickGroupAction.id === quickGroupActions.customerLevel.id ? (
                                    <CreditCorrectionTableRowForm
                                        data={formData}
                                        onFormChange={this.handleFormChange.bind(this)}
                                    />
                                ) : (
                                    <CreditCorrectionTableRowFormLocked quickGroupAction={quickGroupAction} />
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
