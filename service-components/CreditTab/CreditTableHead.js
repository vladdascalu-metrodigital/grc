import React, { Component } from 'react';
import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from './CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from './CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellLimitColSpanTitle from './CRTableHeaderCellLimitColSpanTitle';
import CRTableHeaderCellLimit from './CRTableHeaderCellLimit';
import { lookup } from '../../Util/translations';

const translations = {
    exhausted: lookup('mrc.credittab.exhausted'),
    granted: lookup('mrc.credittab.granted'),
    newlyGranted: lookup('mrc.credittab.newlyGranted'),
    current: lookup('mrc.creditdata.current'),
    old: lookup('mrc.credittab.old'),
    new: lookup('mrc.credittab.new'),
    customerGroup: lookup('mrc.credittab.customerGroup'),
    toBeGranted: lookup('mrc.credittab.toBeGranted'),
    customerWish: lookup('mrc.credittab.customerWish'),
    expiry: lookup('mrc.credittab.expiry'),
    limit: lookup('mrc.credittab.limit'),
    customer: lookup('mrc.customerdata.title'),
    creditproduct: lookup('mrc.creditdetails.creditproduct'),
};

export default class CreditTableHead extends Component {
    render() {
        const { groupLimit, historical, country } = this.props;
        return (
            <React.Fragment>
                <Table.R sticky="credit-table-head-sticky" type="head-light">
                    <Table.H>
                        <CRTableHeaderCellCustomerGroup title={translations.customerGroup} />
                    </Table.H>
                    <Table.H colSpan="3">
                        {groupLimit ? (
                            <CRTableHeaderCellCustomerGroupLimit
                                limit={groupLimit.old}
                                exhausted={groupLimit.exhausted}
                                country={country}
                                subtitle={
                                    groupLimit.exhausted
                                        ? [translations.exhausted, translations.granted].join('/')
                                        : translations.granted
                                }
                                isBlue
                            />
                        ) : null}
                    </Table.H>
                    <Table.H colSpan="3">
                        {groupLimit ? (
                            <CRTableHeaderCellCustomerGroupLimit
                                limit={groupLimit.current}
                                country={country}
                                subtitle={historical ? translations.newlyGranted : translations.toBeGranted}
                                isGreen
                            />
                        ) : null}
                    </Table.H>
                    <Table.H className="border-fix"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H rowSpan="2">{translations.customer}</Table.H>
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
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H>
                        <CRTableHeaderCellLimit prefix={translations.exhausted} title={translations.granted} />
                    </Table.H>
                    <Table.H>{translations.expiry}</Table.H>
                    <Table.H>{translations.creditproduct}</Table.H>
                    <Table.H>{translations.limit}</Table.H>
                    <Table.H>{translations.expiry}</Table.H>
                    <Table.H borderFix>{translations.creditproduct}</Table.H>
                </Table.R>
            </React.Fragment>
        );
    }
}
