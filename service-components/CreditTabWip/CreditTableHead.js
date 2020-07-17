import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';
import {
    isApproval,
    isConiRequestInHistory,
    isCreditCorrectionInHistory,
    isCreditLimit,
    isHistory,
    isLimitExpiryInHistory,
    isLimitRequestInHistory,
} from './CreditTabUtil';

export default class CreditTableHead extends Component {
    render() {
        const { groupLimit, parent, country, translations, historyRequestType, activated } = this.props;
        const ts = translations;
        return (
            <React.Fragment>
                {isCreditLimit(parent)
                    ? this.createGroupHeadWithOnlyTwoStages(parent, groupLimit, country, activated, ts)
                    : isLimitExpiryInHistory(parent, historyRequestType)
                    ? null
                    : isCreditCorrectionInHistory(parent, historyRequestType)
                    ? this.createGroupHeadWithOnlyTwoStages(parent, groupLimit, country, activated, ts)
                    : this.createGroupHeadWithThreeStages(parent, groupLimit, country, activated, ts)}
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H rowSpan="2">{ts.customer}</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle title={isHistory(parent) ? ts.old : ts.current} isBlue />
                    </Table.H>
                    <Table.H colSpan="3">
                        {isCreditLimit(parent) ? (
                            <CRTableHeaderCellLimitColSpanTitle title={ts.customerWish} prefix={''} isGreen />
                        ) : null}
                        {isApproval(parent) ? (
                            <CRTableHeaderCellLimitColSpanTitle title={ts.new} prefix={ts.customerWish} isGreen />
                        ) : null}
                        {isHistory(parent) ? (
                            <CRTableHeaderCellLimitColSpanTitle
                                title={isHistory(parent) ? ts.current : groupLimit.new ? ts.new : ts.customerWish}
                                prefix={
                                    isLimitRequestInHistory(parent, historyRequestType) ||
                                    isConiRequestInHistory(parent, historyRequestType)
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
                            prefix={isLimitExpiryInHistory(parent, historyRequestType) ? null : ts.exhausted}
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
                            limit={isHistory(parent) ? groupLimit.old : groupLimit.current}
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

    // create head with 3 different status e.g. current and wish and new
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
                                limit={isHistory(parent) ? groupLimit.old : groupLimit.current}
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

    // if the customer is activated once, we need to show the status if it is successful
    createAppliedGroupLimitAccordingToActivation(parent, groupLimit, country, ts, isSameRow, activated) {
        return (
            <React.Fragment>
                <Table.H colSpan="3" rowSpan="1">
                    {groupLimit ? (
                        <CRTableHeaderCellCustomerGroupLimit
                            limit={
                                isHistory(parent)
                                    ? groupLimit.current
                                    : isApproval(parent)
                                    ? groupLimit.new
                                    : groupLimit.wish
                            }
                            showExhausted={false}
                            country={country}
                            subtitle={isHistory(parent) ? ts.newlyGranted : ts.toBeGranted}
                            isGreen
                            inSameRow={isSameRow}
                        />
                    ) : null}
                    {groupLimit && isHistory(parent) && activated === true ? (
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
