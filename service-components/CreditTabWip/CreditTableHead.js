import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';
import { translations as ts } from './index';

export default class CreditTableHead extends Component {
    render() {
        const { groupLimit, service, country } = this.props;
        return (
            <React.Fragment>
                <Table.R sticky="credit-table-head-sticky" type="head-light">
                    <Table.H>
                        <CRTableHeaderCellCustomerGroup title={ts.customerGroup} />
                    </Table.H>
                    <Table.H colSpan="3">
                        {groupLimit ? (
                            <CRTableHeaderCellCustomerGroupLimit
                                limit={service === 'history' ? groupLimit.old : groupLimit.current}
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
                                    service === 'history'
                                        ? groupLimit.current
                                        : service === 'approval'
                                        ? groupLimit.new
                                        : groupLimit.wish
                                }
                                country={country}
                                subtitle={service === 'history' ? ts.newlyGranted : ts.toBeGranted}
                                isGreen
                            />
                        ) : null}
                    </Table.H>
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H rowSpan="2">{ts.customer}</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle
                            title={service === 'history' ? ts.old : ts.current}
                            isBlue
                        />
                    </Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle
                            title={service === 'history' ? ts.current : groupLimit.new ? ts.new : ts.customerWish}
                            prefix={groupLimit.new ? ts.customerWish : ''}
                            isGreen
                        />
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
