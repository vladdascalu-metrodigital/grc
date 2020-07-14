import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
import ToggleIndicator from '../../ToggleIndicator';

export default class CreditCorrectionTableRowC extends Component {
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

                    <Table.D colSpan="2">
                        <CRTableCellPrepaymentCash name="Remove Block" isGreen />
                    </Table.D>

                    <Table.D>
                        <ToggleIndicator />
                    </Table.D>
                </Table.R>
                {/* <Table.R>
                    <Table.D>
                        <CRTableCellPrepaymentCash name="Cash" isGreen />
                    </Table.D>
                    <Table.D>
                        -
                    </Table.D>
                    <Table.D borderFix>
                        <CRTableCellCreditProduct
                            productName="Metro Cash"
                            productTimePeriod="14 Days"
                            productPaymentMethod="Direct Debit 1"
                            isGreen
                        />
                    </Table.D>
                </Table.R> */}
            </React.Fragment>
        );
    }
}
