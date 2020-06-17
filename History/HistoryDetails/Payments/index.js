import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../../../Util/translations';
import { Accordion, Collapsible } from '../../../Accordion';
import './index.css';
import * as _ from 'lodash';
import { Table } from '../../../Table';

const parseIntOrVal = x => {
    return typeof x === 'string' || x instanceof String ? parseInt(x, 10) : x;
};

export default class Payments extends Component {
    consolidatedPaymentOverviewTable(paymentsOverviews) {
        var country;
        const allData = _.reduce(
            paymentsOverviews,
            (acc, paymentsOverview) => {
                const sapDatas = paymentsOverview.customerSapDataList;
                const values = _.map(sapDatas, 'amountLocalCurrency');
                const arrears = _.map(sapDatas, 'arrears');
                const dunningLevel = _.map(sapDatas, 'dunningLevel');
                country = _.get(
                    _.find(sapDatas, x => !_.isNil(x.countryId)),
                    'countryId'
                );
                return {
                    values: _.concat(acc.values, values),
                    arrears: _.concat(acc.arrears, arrears),
                    dunningLevel: _.concat(acc.dunningLevel, dunningLevel),
                };
            },
            { values: [], arrears: [], dunningLevel: [] }
        );
        const avgArrear = _.sum(allData.arrears) / allData.arrears.length;
        const consolidatedData = {
            value: _.sum(allData.values),
            arrear: avgArrear.toFixed(2),
            dunningLevel: _.max(_.map(allData.dunningLevel, parseIntOrVal)),
        };
        const columns = [
            {
                Header: lookup('sap.field.value-sum'),
                accessor: 'value',
                renderFn: value => {
                    return <mrc-number show-currency-for-country={country}>{value}</mrc-number>;
                },
            },
            { Header: lookup('sap.field.arreras-avg'), accessor: 'arrear' },
            { Header: lookup('sap.field.dunning-level-max'), accessor: 'dunningLevel' },
        ];
        return (
            <section className="mrc-payments-table">
                <div className="mrc-data-table">
                    <div className="table-header">
                        <p className="metro-blue">{lookup('sap.data.consolidatedPayments')}</p>
                    </div>
                    <Table className="mrc-data-table" columns={columns} data={[consolidatedData]} />
                </div>
            </section>
        );
    }

    paymentOverviewTable(paymentsOverview) {
        const columns = [
            { Header: lookup('sap.field.sap-customer-number'), accessor: 'sapCustomerNo' },
            {
                Header: lookup('sap.field.document-date'),
                accessor: 'documentDate',
                renderFn: data => <mrc-date>{data}</mrc-date>,
            },
            {
                Header: lookup('sap.field.value'),
                accessor: 'amountLocalCurrency',
                renderFn: (value, raw) => (
                    <span>
                        {raw.original.specialDCIndicator === 'H' ? '-' : ''}
                        <mrc-number>{value}</mrc-number>
                    </span>
                ),
            },
            { Header: lookup('sap.field.currency'), accessor: 'currency' },
            { Header: lookup('sap.field.arreras'), accessor: 'arrears' },
            { Header: lookup('sap.field.dunning-level'), accessor: 'dunningLevel' },
            { Header: lookup('sap.field.dunning-block'), accessor: 'dunningBlock' },
            {
                Header: lookup('sap.field.due-date'),
                accessor: 'dueDateInvoice',
                renderFn: data => <mrc-date>{data}</mrc-date>,
            },
        ];

        return (
            <section className="mrc-payments-table" key={paymentsOverview.displayName}>
                <div className="mrc-data-table">
                    <div className="table-header">
                        <p className="metro-blue">{lookup('sap.data.overview')}</p>
                    </div>
                    <Table className="mrc-data-table" columns={columns} data={paymentsOverview.customerSapDataList} />
                </div>
            </section>
        );
    }

    render() {
        if (!_.some(this.props.paymentsOverviews)) {
            return <div className="mrc-detail">{lookup('sap.data.techError')}</div>;
        }
        if (this.props.paymentsOverviews.deactivated) {
            return <div className="mrc-detail">{lookup('sap.data.countryDeactivated')}</div>;
        }
        if (
            this.props.paymentsOverviews.sapDataForCustomers === null ||
            this.props.paymentsOverviews.sapDataForCustomers.length === 0
        ) {
            return (
                <div className="mrc-detail">
                    {this.props.paymentsOverviews.allCompleted
                        ? lookup('sap.data.none-available')
                        : lookup('sap.data.techError')}
                </div>
            );
        }

        const singleCustomerViews = this.props.paymentsOverviews.sapDataForCustomers.map(paymentsOverview => {
            const key = paymentsOverview.displayName;
            const trigger = (
                <div className="mrc-customer-trigger">
                    <span>{paymentsOverview.displayName}</span>
                </div>
            );

            return (
                <Collapsible
                    open={this.props.paymentsOverviews.sapDataForCustomers.length === 1}
                    key={key}
                    trigger={trigger}
                >
                    {this.paymentOverviewTable(paymentsOverview)}
                </Collapsible>
            );
        });

        /*eslint-disable */
        const collapsibles = _.concat(
            <div key="consolidatedPaymentsOverview">
                <div className="mrc-details">
                    {this.consolidatedPaymentOverviewTable(this.props.paymentsOverviews.sapDataForCustomers)}
                </div>
                <br />
            </div>,
            singleCustomerViews
        );
        /*eslint-enable */

        const errMsg = this.props.paymentsOverviews.allCompleted ? null : (
            <div className="mrc-detail">{lookup('sap.data.notCompletely')}</div>
        );
        return (
            <div>
                {errMsg} <Accordion className="mrc-sales-accordion"> {collapsibles} </Accordion>
            </div>
        );
    }
}

Payments.propTypes = {
    limitRequestId: PropTypes.string,
    paymentsOverviews: PropTypes.object,
};
