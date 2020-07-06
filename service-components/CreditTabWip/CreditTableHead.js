import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';
import { translations as ts } from './index';

export default class CreditTableHead extends Component {
    render() {
        const { groupLimit, parent, country } = this.props;
        return (
            <React.Fragment>
                <Table.R sticky="credit-table-head-sticky" type="head-light">
                    <Table.H>
                        <CRTableHeaderCellCustomerGroup title={ts.customerGroup} />
                    </Table.H>
                    <Table.H colSpan="3">
                        {groupLimit ? (
                            <CRTableHeaderCellCustomerGroupLimit
                                limit={parent === 'history' ? groupLimit.old : groupLimit.current}
                                exhausted={groupLimit.exhausted}
                                country={country}
                                subtitle={groupLimit.exhausted ? [ts.exhausted, ts.granted].join('/') : ts.granted}
                                isBlue
                            />
                        ) : null}
                    </Table.H>
                    <Table.H colSpan="3">
                        {groupLimit ? (
                            <CRTableHeaderCellCustomerGroupLimit
                                limit={
                                    parent === 'history'
                                        ? groupLimit.current
                                        : parent === 'approval'
                                        ? groupLimit.new
                                        : groupLimit.wish
                                }
                                country={country}
                                subtitle={parent === 'history' ? ts.newlyGranted : ts.toBeGranted}
                                isGreen
                            />
                        ) : null}
                    </Table.H>
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H rowSpan="2">{ts.customer}</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle title={parent === 'history' ? ts.old : ts.current} isBlue />
                    </Table.H>
                    <Table.H colSpan="3">
                        {parent === 'creditlimit' ? (
                            <CRTableHeaderCellLimitColSpanTitle title={ts.customerWish} prefix={''} isGreen />
                        ) : null}
                        {parent === 'approval' ? (
                            <CRTableHeaderCellLimitColSpanTitle title={ts.new} prefix={ts.customerWish} isGreen />
                        ) : null}
                        {parent === 'history' ? (
                            <CRTableHeaderCellLimitColSpanTitle
                                title={parent === 'history' ? ts.current : groupLimit.new ? ts.new : ts.customerWish}
                                prefix={groupLimit.new ? ts.customerWish : ''}
                                isGreen
                            />
                        ) : null}
                    </Table.H>
                    <Table.H rowSpan="2"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H>
                        <CRTableHeaderCellLimit prefix={ts.exhausted} title={ts.granted} />
                    </Table.H>
                    <Table.H>{ts.expiry}</Table.H>
                    <Table.H>{ts.creditproduct}</Table.H>
                    <Table.H>{ts.limit}</Table.H>
                    <Table.H>{ts.expiry}</Table.H>
                    <Table.H borderFix>{ts.creditproduct}</Table.H>
                </Table.R>
            </React.Fragment>
        );
    }
}
