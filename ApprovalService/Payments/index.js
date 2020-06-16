import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CustomerTrigger from '../../CustomerTrigger/presentation';
import { Accordion, Collapsible } from '../../Accordion';
import { lookup } from '../../Util/translations';
import { Table } from '../../Table';
import * as _ from 'lodash';

const parseIntOrVal = x => {
    return typeof x === 'string' || x instanceof String ? parseInt(x, 10) : x;
};

export default class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null };

        props.getPaymentsData().then(result => {
            this.setState({ data: result });
        });
    }

    consolidatedPaymentOverviewTable(paymentsOverviews) {
        var country;
        const allData = _.reduce(
            paymentsOverviews,
            (acc, paymentsOverview) => {
                const sapDatas = paymentsOverview.sapDataList;
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
        const avgArrears = _.sum(allData.arrears) / allData.arrears.length;
        const consolidatedData = {
            value: _.sum(allData.values),
            arrear: avgArrears.toFixed(2),
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

    paymentOverviewTable = (dataSet, customer) => {
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
            <section className="mrc-payments-table" key={customer.id}>
                <div className="mrc-data-table">
                    <Table
                        className={'mrc-data-table'}
                        title={lookup('sap.data.overview')}
                        columns={columns}
                        data={dataSet}
                    />
                </div>
            </section>
        );
    };

    render() {
        if (!_.some(this.state.data)) {
            return (
                <div className="mrc-sap-data">
                    <h4 className="not-found">{lookup('sap.data.techError')}</h4>
                </div>
            );
        }
        if (this.state.data.deactivated) {
            const resultMsg = <h4 className="not-found">{lookup('sap.data.countryDeactivated')}</h4>;
            return <div className="mrc-sap-data">{resultMsg}</div>;
        }
        if (this.state.data.sapDataForCustomers === null || this.state.data.sapDataForCustomers.length === 0) {
            const resultMsg = this.state.data.allCompleted ? (
                <h4 className="not-found">{lookup('sap.data.none-available')}</h4>
            ) : (
                <h4 className="not-found">{lookup('sap.data.techError')}</h4>
            );
            return <div className="mrc-sap-data">{resultMsg}</div>;
        }
        if (this.state.data.sapDataForCustomers && this.state.data.sapDataForCustomers.length > 0) {
            const singleCustomerViews = this.state.data.sapDataForCustomers.map((data, i) => {
                const id = data.approvalItem.customer.id;
                const trigger = (
                    <div key={i}>
                        <CustomerTrigger
                            customer={data.approvalItem.customer}
                            current={
                                data.approvalItem.currentCreditData ? data.approvalItem.currentCreditData.amount : null
                            }
                            requested={data.approvalItem.requestedCreditData.amount}
                            approved={
                                data.approvalItem.approvedCreditData != null
                                    ? data.approvalItem.approvedCreditData.amount
                                    : undefined
                            }
                        />
                    </div>
                );
                return (
                    <Collapsible open={this.state.data.sapDataForCustomers.length === 1} key={id} trigger={trigger}>
                        {this.paymentOverviewTable(data.sapDataList, data.approvalItem.customer)}
                    </Collapsible>
                );
            });

            /*eslint-disable */
            const collapsibles = _.concat(
                <div key="table">
                    <div className="mrc-details">
                        {this.consolidatedPaymentOverviewTable(this.state.data.sapDataForCustomers)}
                    </div>
                    <br />
                </div>,
                singleCustomerViews
            );
            /*eslint-enable */

            const resultMsg = this.state.data.allCompleted ? null : (
                <h4 className="not-found">{lookup('sap.data.notCompletely')}</h4>
            );
            return (
                <div className="mrc-sap-data">
                    {resultMsg}
                    <Accordion className="mrc-sap-data-accordion">{collapsibles}</Accordion>
                </div>
            );
        }
    }
}

Payments.propTypes = {
    data: PropTypes.array,
    ready: PropTypes.bool,
    getPaymentsData: PropTypes.func,
};
