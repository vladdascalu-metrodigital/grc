import React, { Component } from 'react';
import Table from './Table';

export default class CreditTableRowA extends Component {
    render() {
        return (
            <>
                <Table.R>
                    <Table.D>Mepo Gmbh</Table.D>
                    <Table.D>Exhausted/Granted</Table.D>
                    <Table.D>Expiry</Table.D>
                    <Table.D>Creditproduct</Table.D>
                    <Table.D>wish 21000</Table.D>
                    <Table.D>wish 22.03.2020</Table.D>
                    <Table.D>product a</Table.D>
                    <Table.D>toggler</Table.D>
                </Table.R>
            </>
        );
    }
}
