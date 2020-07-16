import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableCellCustomer from '../CreditTablesCommons/CRTableCellCustomer';
import CRTableCellLimit from '../CreditTablesCommons/CRTableCellLimit';
import CRTableCellCreditProduct from '../CreditTablesCommons/CRTableCellCreditProduct';
import CTableCellBiggerText from '../CreditTablesCommons/CTableCellBiggerText';
import ToggleIndicator from '../../ToggleIndicator';

export default class CreditCorrectionTableRowC extends Component {
    render() {
        return (
            <React.Fragment>
                <Table.R isActive>
                    <Table.D>
                        <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked isHighlighted />
                    </Table.D>
                    <Table.D colSpan="3">
                        <CTableCellBiggerText text="Prepayment" color="blue" />
                    </Table.D>
                    <Table.D>
                        <CRTableCellLimit country="EUR" limit="30000" isGreen />
                    </Table.D>
                    <Table.D>---</Table.D>
                    <Table.D>
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="14 Days"
                            productPaymentMethod="Direct Debit 1"
                            isGreen
                        />
                    </Table.D>
                    <Table.D>
                        <ToggleIndicator />
                    </Table.D>
                </Table.R>
            </React.Fragment>
        );
    }
}
