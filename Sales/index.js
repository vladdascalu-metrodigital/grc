import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './sales.scss';
import './data-table.scss';
import { lookup } from '../Util/translations.js';
import { Accordion, Collapsible } from '../Accordion';
import CustomerTrigger from '../CustomerTrigger/presentation';
import { Table } from '../Table';
import * as _ from 'lodash';

export default class Sales extends Component {
    orZero(val) {
        return val === undefined || val === 'NaN' ? 0 : val;
    }

    makeConsolidatedData(mdwData) {
        var country = '';
        const rows = _.reduce(
            mdwData,
            (acc, salesOverview) => {
                acc[0].l1 += this.orZero(salesOverview.customerCreditData.numPurchasesL1m);
                acc[1].l1 += this.orZero(salesOverview.customerCreditData.numInvoicesL1m);
                acc[2].l1 += this.orZero(salesOverview.customerCreditData.sellValNspL1m);

                acc[0].l3 += this.orZero(salesOverview.customerCreditData.numPurchasesL3m);
                acc[1].l3 += this.orZero(salesOverview.customerCreditData.numInvoicesL3m);
                acc[2].l3 += this.orZero(salesOverview.customerCreditData.sellValNspL3m);

                acc[0].l6 += this.orZero(salesOverview.customerCreditData.numPurchasesL6m);
                acc[1].l6 += this.orZero(salesOverview.customerCreditData.numInvoicesL6m);
                acc[2].l6 += this.orZero(salesOverview.customerCreditData.sellValNspL6m);

                acc[0].l12 += this.orZero(salesOverview.customerCreditData.numPurchasesL12m);
                acc[1].l12 += this.orZero(salesOverview.customerCreditData.numInvoicesL12m);
                acc[2].l12 += this.orZero(salesOverview.customerCreditData.sellValNspL12m);

                if (salesOverview.customer.country) {
                    country = salesOverview.customer.country;
                    acc[0].country = country;
                    acc[1].country = country;
                    acc[2].country = country;
                }

                return acc;
            },
            [
                { tag: 'purchase', name: lookup('mrc.mdw.numberofpurchase'), l1: 0, l3: 0, l6: 0, l12: 0 },
                { tag: 'invoices', name: lookup('mrc.mdw.numberofinvoices'), l1: 0, l3: 0, l6: 0, l12: 0 },
                { name: lookup('mrc.mdw.totalturnover'), l1: 0, l3: 0, l6: 0, l12: 0, country: country },
            ]
        );
        return rows;
    }

    constructor(props) {
        super(props);
        this.state = { mdtData: null };
    }

    componentDidMount() {
        if (!this.props.mdwData && this.props.getMdwData) {
            this.props.getMdwData().then(result => {
                this.setState({ mdwData: result });
            });
        }
    }

    wrapCurrency(value, sales) {
        if (sales.original.tag === 'purchase' || sales.original.tag === 'invoices') {
            return <mrc-number>{value}</mrc-number>;
        } else {
            return <mrc-number show-currency-for-country={sales.original.country}>{value}</mrc-number>;
        }
    }

    createConsolidatedSalesView(data) {
        const columns = [
            { Header: '', accessor: 'name' },
            { Header: 'L1M', accessor: 'l1', renderFn: this.wrapCurrency },
            { Header: 'L3M', accessor: 'l3', renderFn: this.wrapCurrency },
            { Header: 'L6M', accessor: 'l6', renderFn: this.wrapCurrency },
            { Header: 'L12M', accessor: 'l12', renderFn: this.wrapCurrency },
        ];

        return (
            <div>
                <Table
                    columns={columns}
                    data={this.makeConsolidatedData(data)}
                    title={lookup('mrc.mdw.salesoverview')}
                    className="mrc-data-table"
                />
            </div>
        );
    }

    createOneSalesView(data) {
        const columns = [
            { Header: '', accessor: 'name' },
            { Header: 'L1M', accessor: 'l1', renderFn: this.wrapCurrency },
            { Header: 'L3M', accessor: 'l3', renderFn: this.wrapCurrency },
            { Header: 'L6M', accessor: 'l6', renderFn: this.wrapCurrency },
            { Header: 'L12M', accessor: 'l12', renderFn: this.wrapCurrency },
        ];

        const country = data.customer.country;

        const salesRows = [
            {
                name: lookup('mrc.mdw.numberofpurchase'),
                country: country,
                tag: 'purchase',
                l1: data.customerCreditData.numPurchasesL1m,
                l3: data.customerCreditData.numPurchasesL3m,
                l6: data.customerCreditData.numPurchasesL6m,
                l12: data.customerCreditData.numPurchasesL12m,
            },
            {
                name: lookup('mrc.mdw.numberofinvoices'),
                tag: 'invoices',
                country: country,
                l1: data.customerCreditData.numInvoicesL1m,
                l3: data.customerCreditData.numInvoicesL3m,
                l6: data.customerCreditData.numInvoicesL6m,
                l12: data.customerCreditData.numInvoicesL12m,
            },
            {
                name: lookup('mrc.mdw.totalturnover'),
                country: country,
                l1: data.customerCreditData.sellValNspL1m,
                l3: data.customerCreditData.sellValNspL3m,
                l6: data.customerCreditData.sellValNspL6m,
                l12: data.customerCreditData.sellValNspL12m,
            },
        ];

        const behaviourRows = data.behaviourDataList.map(x => {
            return {
                name: lookup('mrc.mdw.behaviour-' + x.behaviouralCode + '-' + x.country),
                country: country,
                l1: x.behvSellValNspL1m,
                l3: x.behvSellValNspL3m,
                l6: x.behvSellValNspL6m,
                l12: x.behvSellValNspL12m,
            };
        });

        return (
            <div>
                <Table
                    columns={columns}
                    data={salesRows}
                    className="mrc-data-table"
                    title={lookup('mrc.mdw.salesoverview')}
                />
                <Table
                    columns={columns}
                    data={behaviourRows}
                    className="mrc-data-table"
                    title={lookup('mrc.mdw.merchandisegroupturnover')}
                />
            </div>
        );
    }

    render() {
        const mdwData = this.props.mdwData || this.state.mdwData;

        if (this.props.createdFrom == 'creditlimit') {
            return null;
        }

        if (mdwData == null || mdwData.length == 0) {
            return <h4 className="not-found">{lookup('mrc.mdw.nodataavailable')}</h4>;
        }

        //For group
        const collapsibles = mdwData.map(mdwCustomer => {
            const key =
                mdwCustomer.customerCreditData.storeNumber + '/' + mdwCustomer.customerCreditData.customerNumber;
            const trigger = (
                <CustomerTrigger
                    customer={mdwCustomer.customer}
                    current={mdwCustomer.currentCreditData ? mdwCustomer.currentCreditData.amount : null}
                    requested={mdwCustomer.requestedCreditData ? mdwCustomer.requestedCreditData.amount : null}
                />
            );
            return (
                <Collapsible open={mdwData.length === 1} key={key} trigger={trigger}>
                    {this.createOneSalesView(mdwCustomer)}
                </Collapsible>
            );
        });

        let accordion;
        if (mdwData.length > 1) {
            accordion = (
                <Accordion className="mrc-sales-accordion">
                    <Collapsible open={true} trigger={lookup('mrc.mdw.consolidatedturnover')}>
                        {this.createConsolidatedSalesView(mdwData)}
                    </Collapsible>
                    {collapsibles}
                </Accordion>
            );
        } else {
            accordion = <Accordion className="mrc-sales-accordion"> {collapsibles} </Accordion>;
        }
        return <div>{accordion};</div>;
    }

    createRow = item => {
        return (
            <tr key={item.behaviouralCode}>
                <th className="row-title">
                    {lookup('mrc.mdw.behaviour-' + item.behaviouralCode + '-' + item.country)}
                </th>
                <td className="col-1">{item.behvSellValNspL1m}</td>
                <td className="col-2">{item.behvSellValNspL3m}</td>
                <td className="col-3">{item.behvSellValNspL6m}</td>
                <td className="col-4">{item.behvSellValNspL12m}</td>
            </tr>
        );
    };
}

Sales.propTypes = {
    limitRequestId: PropTypes.string,
    getMdwData: PropTypes.func,
    createdFrom: PropTypes.string,
    mdwData: PropTypes.array,
};
