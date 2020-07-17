import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';

export default class CreditTableHead extends Component {
    render() {
        const { groupLimit, parent, country, translations, historyRequestType, activated } = this.props;
        const ts = translations;
        return (
            <React.Fragment>
                {parent === 'creditlimit'
                    ? this.createGroupHeadWithOnlyTwoStages(parent, groupLimit, country, activated, ts)
                    : parent === 'history' && historyRequestType === 'LIMIT_EXPIRY'
                    ? null
                    : parent === 'history' && historyRequestType === 'CREDIT_CORRECTION'
                    ? this.createGroupHeadWithOnlyTwoStages(parent, groupLimit, country, activated, ts)
                    : this.createGroupHeadWithThreeStages(parent, groupLimit, country, activated, ts)}
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
                                prefix={
                                    parent === 'history' &&
                                    (historyRequestType === 'LIMIT_REQUEST' || historyRequestType === 'CONI_REQUEST')
                                        ? ts.customerWish
                                        : groupLimit.new
                                        ? ts.customerWish
                                        : ''
                                }
                                isGreen
                            />
                        ) : null}
                    </Table.H>
                    <Table.H rowSpan="2"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H>
                        <CRTableHeaderCellLimit
                            prefix={parent === 'history' && historyRequestType === 'LIMIT_EXPIRY' ? null : ts.exhausted}
                            title={ts.granted}
                        />
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

    // create head with only old and current in history, or current and wish in credit limit
    createGroupHeadWithOnlyTwoStages(parent, groupLimit, country, activated, ts) {
        return (
            <Table.R sticky="credit-table-head-sticky" type="head-light">
                <Table.H>
                    <CRTableHeaderCellCustomerGroup title={ts.customergroup} />
                </Table.H>
                <Table.H colSpan="3">
                    {groupLimit ? (
                        <CRTableHeaderCellCustomerGroupLimit
                            limit={parent === 'history' ? groupLimit.old : groupLimit.current}
                            showExhausted={true}
                            exhausted={groupLimit.exhausted}
                            country={country}
                            subtitle={[ts.exhausted, ts.granted].join(' / ')}
                            isBlue
                        />
                    ) : null}
                </Table.H>
                {this.createAppliedGroupLimitAccordingToActivation(parent, groupLimit, country, ts, false, activated)}
                <Table.H className="border-fix"></Table.H>
            </Table.R>
        );
    }

    createGroupHeadWithThreeStages(parent, groupLimit, country, activated, ts) {
        return (
            <React.Fragment>
                <Table.R sticky="credit-table-head-sticky" type="head-light">
                    <Table.H rowSpan="2">
                        <CRTableHeaderCellCustomerGroup title={ts.customergroup} />
                    </Table.H>
                    <Table.H colSpan="3" rowSpan="2">
                        {groupLimit ? (
                            <CRTableHeaderCellCustomerGroupLimit
                                limit={parent === 'history' ? groupLimit.old : groupLimit.current}
                                showExhausted={true}
                                exhausted={groupLimit.exhausted}
                                country={country}
                                subtitle={[ts.exhausted, ts.granted].join(' / ')}
                                isBlue
                            />
                        ) : null}
                    </Table.H>
                    <Table.H colSpan="3" rowSpan="1">
                        {groupLimit ? (
                            <CRTableHeaderCellCustomerGroupLimit
                                limit={groupLimit.wish}
                                showExhausted={false}
                                country={country}
                                subtitle={ts.customerWish}
                                inSameRow
                            />
                        ) : null}
                    </Table.H>
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head-light">
                    {this.createAppliedGroupLimitAccordingToActivation(
                        parent,
                        groupLimit,
                        country,
                        ts,
                        true,
                        activated
                    )}
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
            </React.Fragment>
        );
    }

    createAppliedGroupLimitAccordingToActivation(parent, groupLimit, country, ts, isSameRow, activated) {
        return (
            <React.Fragment>
                <Table.H colSpan="3" rowSpan="1">
                    {groupLimit ? (
                        <CRTableHeaderCellCustomerGroupLimit
                            limit={
                                parent === 'history'
                                    ? groupLimit.current
                                    : parent === 'approval'
                                    ? groupLimit.new
                                    : groupLimit.wish
                            }
                            showExhausted={false}
                            country={country}
                            subtitle={parent === 'history' ? ts.newlyGranted : ts.toBeGranted}
                            isGreen
                            inSameRow={isSameRow}
                        />
                    ) : null}
                    {groupLimit && parent === 'history' && activated === true ? (
                        <CRTableHeaderCellCustomerGroupLimit
                            limit={groupLimit.activated}
                            showExhausted={false}
                            country={country}
                            subtitle={ts.newlyActivated}
                            isGreen
                            inSameRow
                        />
                    ) : null}
                </Table.H>
            </React.Fragment>
        );
    }
}
