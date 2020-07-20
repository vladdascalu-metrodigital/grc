import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import ToggleIndicator from '../../ToggleIndicator';

export default class CreditTableRowA extends Component {
    render() {
        return (
            <React.Fragment>
                <Table.R>
                    <Table.D>
                        <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked />
                    </Table.D>
                    <Table.D>
                        <CRTableCellLimit country="EUR" exhausted="22000" limit="30000" isBlue />
                    </Table.D>
                    <Table.D>
                        <CRTableCellExpiry expiryLimit="10000" expiryDate="4/2/2020" isBlue />
                    </Table.D>
                    <Table.D>
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="14 Days"
                            productPaymentMethod="Direct Debit 1"
                            isBlue
                        />
                    </Table.D>
                    <Table.D>
                        <CRTableCellLimit country="EUR" limit="40000" isGreen />
                    </Table.D>
                    <Table.D>
                        <CRTableCellExpiry expiryLimit="30000" expiryDate="4/2/2020" isGreen />
                    </Table.D>
                    <Table.D>
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="28 Days"
                            productPaymentMethod="Direct Debit 2"
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
