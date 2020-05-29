import React, { Component } from 'react';
import Table from './Table';

export default class CreditTableRowC extends Component {
    render() {
        return (
            <>
                <Table.R isActive>
                    <Table.D rowSpan="2">Mepo Gmbh</Table.D>

                    <Table.D colSpan="3" rowSpan="2">
                        Prepayment
                    </Table.D>

                    <Table.D colSpan="3">Cash</Table.D>

                    <Table.D rowSpan="2">toggler</Table.D>
                </Table.R>
                <Table.R isActive>
                    <Table.D>new 21300</Table.D>
                    <Table.D>new expiry</Table.D>
                    <Table.D borderFix>new product</Table.D>
                </Table.R>
            </>
        );
    }
}
