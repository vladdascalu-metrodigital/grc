import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';

export default class CreditTableHead extends Component {
    render() {
        return (
            <Table.Head>
                <Table.R isSticky type="light">
                    <Table.H>
                        <CRTableHeaderCellCustomerGroup title="Customer Group" />
                    </Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellCustomerGroupLimit
                            limit="22000"
                            exhausted="13000"
                            country="EUR"
                            subtitle="Exhausted / Granted"
                            isBlue
                        />
                    </Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellCustomerGroupLimit
                            limit="22000"
                            country="EUR"
                            subtitle="To be granted"
                            isGreen
                        />
                    </Table.H>
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
                <Table.R isSticky>
                    <Table.H rowSpan="2">Customer</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle title="Current" isBlue />
                    </Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle title="New" prefix="Customer Wish" isGreen />
                    </Table.H>
                    <Table.H rowSpan="2"></Table.H>
                </Table.R>
                <Table.R isSticky>
                    <Table.H>
                        <CRTableHeaderCellLimit prefix="Exhausted" title="Granted" />
                    </Table.H>
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
