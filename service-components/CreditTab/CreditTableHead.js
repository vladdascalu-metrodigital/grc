import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';
import { lookup } from '../../Util/translations';

export default class CreditTableHead extends Component {
    render() {
        console.log(this.props);
        const { groupLimit, historical, countryCode } = this.props;
        const translations = {
            exhausted: lookup('mrc.credittab.exhausted'),
            granted: lookup('mrc.credittab.granted'),
            current: lookup('mrc.creditdata.current'),
            old: lookup('mrc.credittab.old'),
            new: lookup('mrc.credittab.new'),
            customerGroup: lookup('mrc.credittab.customerGroup'),
            toBeGranted: lookup('mrc.credittab.toBeGranted'),
            customerWish: lookup('mrc.credittab.customerWish'),
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
            <Table.Head>
                <Table.R isSticky type="light">
                    <Table.H>
                        <CRTableHeaderCellCustomerGroup title={translations.customerGroup} />
                    </Table.H>
                    <Table.H colSpan="3">{granted}</Table.H>
                    <Table.H colSpan="3">{customerWish}</Table.H>
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
                <Table.R isSticky>
                    <Table.H rowSpan="2">Customer</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle
                            title={historical ? translations.old : translations.current}
                            isBlue
                        />
                    </Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellLimitColSpanTitle
                            title={historical ? translations.current : translations.new}
                            prefix={translations.customerWish}
                            isGreen
                        />
                    </Table.H>
                    <Table.H rowSpan="2"></Table.H>
                </Table.R>
                <Table.R isSticky>
                    <Table.H>
                        <CRTableHeaderCellLimit prefix={translations.exhausted} title={translations.granted} />
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
