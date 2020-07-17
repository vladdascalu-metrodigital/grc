import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../../Util/translations';

import Table from '../../MrcTable';
import CRTableHeaderCellCustomerGroup from '../CreditTablesCommons/CRTableHeaderCellCustomerGroup';
import CRTableHeaderCellCustomerGroupLimit from '../CreditTablesCommons/CRTableHeaderCellCustomerGroupLimit';
import CRTableHeaderCellTitle from '../CreditTablesCommons/CRTableHeaderCellTitle';

import './CreditCorrectionTableHead.scss';

export default class CreditCorrectionTableHead extends Component {
    render() {
        const { groupLimit, countryCode } = this.props;
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
                    <Table.H className="mrc-ui-credit-correction-head-col">
                        <CRTableHeaderCellCustomerGroup title={translations.customerGroup} />
                    </Table.H>
                    <Table.H colSpan="3" className="mrc-ui-credit-correction-head-col">
                        {granted}
                    </Table.H>
                    <Table.H colSpan="3" className="mrc-ui-credit-correction-head-col">
                        {customerWish}
                    </Table.H>
                    <Table.H className="border-fix mrc-ui-credit-correction-toggler-col"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H rowSpan="2">Customer</Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellTitle title={translations.current} color="blue" />
                    </Table.H>
                    <Table.H colSpan="3">
                        <CRTableHeaderCellTitle title={translations.new} color="green" />
                    </Table.H>
                    <Table.H rowSpan="2"></Table.H>
                </Table.R>
                <Table.R sticky="credit-table-head-sticky" type="head">
                    <Table.H>
                        <CRTableHeaderCellTitle prefix={translations.exhausted} title={translations.granted} />
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

CreditCorrectionTableHead.propTypes = {
    countryCode: PropTypes.string,
    groupLimit: PropTypes.shape({
        applied: PropTypes.number,
        exhausted: PropTypes.number,
        customerWish: PropTypes.number,
    }),
};
