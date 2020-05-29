import React, { Component } from 'react';
import Table from './Table';

export default class CreditTableHead extends Component {
    render() {
        return (
            <Table.Head>
                <Table.R isSticky type="light">
                    <Table.H>Customer Group</Table.H>
                    <Table.H colSpan="3">20000</Table.H>
                    <Table.H colSpan="3">22000</Table.H>
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
                <Table.R isSticky>
                    <Table.H rowSpan="2">Customer</Table.H>
                    <Table.H colSpan="3">Current</Table.H>
                    <Table.H colSpan="3">Customer Wish/ New</Table.H>
                    <Table.H rowSpan="2"></Table.H>
                </Table.R>
                <Table.R isSticky>
                    <Table.H>Exhausted/Granted</Table.H>
                    <Table.H>Expiry</Table.H>
                    <Table.H>Creditproduct</Table.H>
                    <Table.H>Limit</Table.H>
                    <Table.H>Expiry</Table.H>
                    <Table.H borderFix>Creditproduct</Table.H>
                </Table.R>
            </Table.Head>
        );
    }
}
