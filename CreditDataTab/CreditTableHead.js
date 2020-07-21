import React, { Component } from 'react';
import Table from '../MrcTable';
import CRTableHeaderCellCustomerGroup from './CreditTable/CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CreditTable/CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellTitle from './CreditTable/CRTableHeaderCellTitle';
import CRTableHeaderCellLimit from './CreditTable/CRTableHeaderCellLimit';
import {
    isApproval,
    isConiRequestInHistory,
    isCreditCorrection,
    isCreditCorrectionInHistory,
    isCreditLimit,
    isHistory,
    isLimitExpiryInHistory,
    isLimitRequestInHistory,
} from './creditDataTabUtil';

export default class CreditTableHead extends Component {
    render() {
        const { groupLimit, parent, translations, historyRequestType } = this.props;
        const ts = translations;
        return (
            <React.Fragment>
                {this.renderGroupLimit()}
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H rowSpan="2">{ts.customer}</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellTitle title={isHistory(parent) ? ts.old : ts.current} color={'blue'} />
                    </Table.H>
                    <Table.H colSpan="3">
                        {isCreditLimit(parent) ? (
                            <CRTableHeaderCellTitle title={ts.customerWish} prefix={''} color={'green'} />
                        ) : null}
                        {isApproval(parent) ? (
                            <CRTableHeaderCellTitle title={ts.new} prefix={ts.customerWish} color={'green'} />
                        ) : null}
                        {isHistory(parent) ? (
                            <CRTableHeaderCellTitle
                                title={isHistory(parent) ? ts.current : groupLimit.new ? ts.new : ts.customerWish}
                                prefix={
                                    isLimitRequestInHistory(parent, historyRequestType) ||
                                    isConiRequestInHistory(parent, historyRequestType)
                                        ? ts.customerWish
                                        : groupLimit.new
                                        ? ts.customerWish
                                        : ''
                                }
                                color={'green'}
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

    renderGroupLimit() {
        const { groupLimit, parent, country, translations, historyRequestType, activated } = this.props;
        const ts = translations;

        if (
            isCreditLimit(parent) ||
            isCreditCorrection(parent) ||
            isCreditCorrectionInHistory(parent, historyRequestType)
        ) {
            return this.createGroupHeadWithOnlyTwoStages(parent, groupLimit, country, activated, ts);
        }

        if (isLimitExpiryInHistory(parent, historyRequestType)) {
            return null;
        }

        return this.createGroupHeadWithThreeStages(parent, groupLimit, country, activated, ts);
    }

    // create head with only old and current in history, or current and wish in credit limit, or current and new in crc
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
                            color={'blue'}
                        />
                    ) : null}
                </Table.H>
                {this.createAppliedGroupLimitAccordingToActivation(
                    parent,
                    groupLimit,
                    country,
                    ts,
                    isCreditCorrection(parent) && activated === true,
                    activated
                )}
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
                                color={'blue'}
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
                                inSameRow={true}
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
                                    : isApproval(parent) || isCreditCorrection(parent)
                                    ? groupLimit.new
                                    : groupLimit.wish
                            }
                            showExhausted={false}
                            country={country}
                            subtitle={isHistory(parent) ? ts.newlyGranted : ts.toBeGranted}
                            color={'green'}
                            inSameRow={isSameRow}
                        />
                    ) : null}
                    {groupLimit && (isHistory(parent) || isCreditCorrection(parent)) && activated === true ? (
                        <CRTableHeaderCellCustomerGroupLimit
                            limit={groupLimit.activated}
                            showExhausted={false}
                            country={country}
                            subtitle={ts.newlyActivated}
                            color={'green'}
                            inSameRow={true}
                        />
                    ) : null}
                </Table.H>
            </React.Fragment>
        );
    }
}
