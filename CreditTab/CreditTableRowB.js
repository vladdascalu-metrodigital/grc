import React, { Component } from 'react';
import Table from '../MrcTable';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import ToggleIndicator from '../ToggleIndicator';

export default class CreditTableRowB extends Component {
    render() {
        return (
            <>
                <Table.R>
                    <Table.D rowSpan="2">
                        <CRTableCellCustomer name="Mepo GmbH" number="12/123432" isBlocked />
                    </Table.D>
                    <Table.D rowSpan="2">
                        <CRTableCellLimit country="EUR" exhausted="22000" limit="30000" isBlue />
                    </Table.D>
                    <Table.D rowSpan="2">
                        <CRTableCellExpiry expiryLimit="10000" expiryDate="4/2/2020" isBlue />
                    </Table.D>
                    <Table.D rowSpan="2">
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="14 Days"
                            productPaymentMethod="Direct Debit 1"
                            isBlue
                        />
                    </Table.D>
                    <Table.D>
                        <CRTableCellLimit country="EUR" limit="30000" />
                    </Table.D>
                    <Table.D>
                        <CRTableCellExpiry expiryLimit="10000" expiryDate="4/2/2020" />
                    </Table.D>
                    <Table.D>
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="14 Days"
                            productPaymentMethod="Direct Debit 1 foobar"
                        />
                    </Table.D>
                    <Table.D rowSpan="2">
                        <ToggleIndicator />
                    </Table.D>
                </Table.R>
                <Table.R>
                    <Table.D>
                        <CRTableCellLimit country="EUR" limit="30000" isGreen />
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
            </>
        );
    }
}
