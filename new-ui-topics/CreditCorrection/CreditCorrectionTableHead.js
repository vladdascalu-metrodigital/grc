import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';
import { lookup } from '../../Util/translations';

import './CreditCorrectionTableHead.scss';

export default class CreditCorrectionTableHead extends Component {
    render() {
        const { groupLimit, historical, countryCode } = this.props;
        const translations = {
            exhausted: lookup('mrc.credittab.exhausted'),
            granted: lookup('mrc.credittab.granted'),
            current: lookup('mrc.creditdata.current'),
            old: lookup('mrc.credittab.old'),
            new: lookup('mrc.credittab.new'),
            customerGroup: lookup('mrc.credittab.customerGroup'),
            toBeGranted: lookup('mrc.credittab.toBeGranted'),
            expiry: lookup('mrc.credittab.expiry'),
            limit: lookup('mrc.credittab.limit'),
            creditproduct: lookup('mrc.creditdetails.creditproduct'),
        };
        const granted = groupLimit ? (
            <CRTableHeaderCellCustomerGroupLimit
                limit={groupLimit.applied}
                exhausted={groupLimit.exhausted}
                country={countryCode}
                subtitle={
                    groupLimit.exhausted
                        ? [translations.exhausted, translations.granted].join('/')
                        : translations.granted
                }
                isBlue
            />
        ) : null;
        const customerWish = groupLimit ? (
            <CRTableHeaderCellCustomerGroupLimit
                limit={groupLimit.customerWish}
                country={countryCode}
                subtitle={translations.toBeGranted}
                isGreen
            />
        ) : null;
        return (
            <React.Fragment>
                <Table.R sticky="credit-table-head-sticky" type="head-light">
                    <Table.H>
                        <CRTableHeaderCellCustomerGroup title={translations.customerGroup} />
                    </Table.H>
                    <Table.H colSpan="3" className="mrc-ui-table-head-width">
                        {granted}
                    </Table.H>
                    <Table.H colSpan="2" className="mrc-ui-table-head-width">
                        {customerWish}
                    </Table.H>
                    <Table.H className="border-fix" style={{ width: '20px' }}></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H rowSpan="2">Customer</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle
                            title={historical ? translations.old : translations.current}
                            isBlue
                        />
                    </Table.H>
                    <Table.H colSpan="2">
                        <CRTableHeaderCellLimitColSpanTitle
                            title={historical ? translations.current : translations.new}
                            isGreen
                        />
                    </Table.H>
                    <Table.H rowSpan="2"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H>
                        <CRTableHeaderCellLimit prefix={translations.exhausted} title={translations.granted} />
                    </Table.H>
                    <Table.H>{translations.expiry}</Table.H>
                    <Table.H>{translations.creditproduct}</Table.H>
                    <Table.H>{translations.limit}</Table.H>
                    <Table.H borderFix>{translations.creditproduct}</Table.H>
                </Table.R>
            </React.Fragment>
        );
    }
}
