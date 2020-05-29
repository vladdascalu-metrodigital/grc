import React, { Component } from 'react';
import Table from './Table';

export default class CreditTableHead extends Component {
    render() {
        return (
            <>
                <Table.R>
                    <Table.D rowSpan="2">Mepo Gmbh</Table.D>
                    <Table.D rowSpan="2">Exhausted/Granted</Table.D>
                    <Table.D rowSpan="2">Expiry</Table.D>
                    <Table.D rowSpan="2">Creditproduct</Table.D>
                    <Table.D>wish 21000</Table.D>
                    <Table.D>wish 22.03.2020</Table.D>
                    <Table.D>product a</Table.D>
                    <Table.D rowSpan="2">toggler</Table.D>
                </Table.R>
                <Table.R>
                    <Table.D>new 21300</Table.D>
                    <Table.D>new expiry</Table.D>
                    <Table.D borderFix>new product</Table.D>
                </Table.R>
            </>
        );
    }
}
