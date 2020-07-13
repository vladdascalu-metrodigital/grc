import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
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
                        <CRTableCellPrepaymentCash name="Prepayment" isBlue />
                    </Table.D>
                    <Table.D>
                        <CRTableCellLimit country="EUR" limit="30000" isGreen />
                    </Table.D>
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
