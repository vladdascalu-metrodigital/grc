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
                const cd = salesOverview.customerCreditData;

                acc[0].l1 += this.orZero(cd.numPurchasesL1m);
                acc[1].l1 += this.orZero(cd.numInvoicesL1m);
                acc[2].l1 += this.orZero(cd.sellValNspL1m);
                acc[3].l1 += this.orZero(cd.sellValNspL1m) - this.orZero(cd.sellValNnbpL1m);
                if (this.orZero(cd.sellValNspL1m) === 0) {
                    acc[4].l1 += 0;
                } else {
                    acc[4].l1 +=
                        (100 * (this.orZero(cd.sellValNspL1m) - this.orZero(cd.sellValNnbpL1m))) /
                        this.orZero(cd.sellValNspL1m);
                }

                acc[0].l3 += this.orZero(cd.numPurchasesL3m);
                acc[1].l3 += this.orZero(cd.numInvoicesL3m);
                acc[2].l3 += this.orZero(cd.sellValNspL3m);
                acc[3].l3 += this.orZero(cd.sellValNspL3m) - this.orZero(cd.sellValNnbpL3m);
                if (this.orZero(cd.sellValNspL3m) === 0) {
                    acc[4].l3 += 0;
                } else {
                    acc[4].l3 +=
                        (100 * (this.orZero(cd.sellValNspL3m) - this.orZero(cd.sellValNnbpL3m))) /
                        this.orZero(cd.sellValNspL3m);
                }

                acc[0].l6 += this.orZero(cd.numPurchasesL6m);
                acc[1].l6 += this.orZero(cd.numInvoicesL6m);
                acc[2].l6 += this.orZero(cd.sellValNspL6m);
                acc[3].l6 += this.orZero(cd.sellValNspL6m) - this.orZero(cd.sellValNnbpL6m);
                if (this.orZero(cd.sellValNspL6m) === 0) {
                    acc[4].l6 += 0;
                } else {
                    acc[4].l6 +=
                        (100 * (this.orZero(cd.sellValNspL6m) - this.orZero(cd.sellValNnbpL6m))) /
                        this.orZero(cd.sellValNspL6m);
                }

                acc[0].l12 += this.orZero(cd.numPurchasesL12m);
                acc[1].l12 += this.orZero(cd.numInvoicesL12m);
                acc[2].l12 += this.orZero(cd.sellValNspL12m);
                acc[3].l12 += this.orZero(cd.sellValNspL12m) - this.orZero(cd.sellValNnbpL12m);
                if (this.orZero(cd.sellValNspL12m) === 0) {
                    acc[4].l12 += 0;
                } else {
                    acc[4].l12 +=
                        (100 * (this.orZero(cd.sellValNspL12m) - this.orZero(cd.sellValNnbpL12m))) /
                        this.orZero(cd.sellValNspL12m);
                }

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
                { name: lookup('mrc.mdw.totalgrossprofit'), l1: 0, l3: 0, l6: 0, l12: 0, country: country },
                { tag: 'margin', name: lookup('mrc.mdw.totalmargin'), l1: 0, l3: 0, l6: 0, l12: 0 },
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
        } else if (sales.original.tag === 'margin') {
            return (
                <span>
                    <mrc-number>{_.isNil(value) ? value : Number(value).toFixed(2)}</mrc-number>%
                </span>
            );
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
        const cd = data.customerCreditData;

        const salesRows = [
            {
                name: lookup('mrc.mdw.numberofpurchase'),
                country: country,
                tag: 'purchase',
                l1: cd.numPurchasesL1m,
                l3: cd.numPurchasesL3m,
                l6: cd.numPurchasesL6m,
                l12: cd.numPurchasesL12m,
            },
            {
                name: lookup('mrc.mdw.numberofinvoices'),
                tag: 'invoices',
                country: country,
                l1: cd.numInvoicesL1m,
                l3: cd.numInvoicesL3m,
                l6: cd.numInvoicesL6m,
                l12: cd.numInvoicesL12m,
            },
            {
                name: lookup('mrc.mdw.totalturnover'),
                country: country,
                l1: cd.sellValNspL1m,
                l3: cd.sellValNspL3m,
                l6: cd.sellValNspL6m,
                l12: cd.sellValNspL12m,
            },
            {
                name: lookup('mrc.mdw.totalgrossprofit'), //sell_val_nsp_lxm - sell_val_nnbp_lxm
                country: country,
                l1: cd.sellValNspL1m - cd.sellValNnbpL1m,
                l3: cd.sellValNspL3m - cd.sellValNnbpL3m,
                l6: cd.sellValNspL6m - cd.sellValNnbpL6m,
                l12: cd.sellValNspL12m - cd.sellValNnbpL12m,
            },
            {
                name: lookup('mrc.mdw.totalmargin'), //(sell_val_nsp_lxm - sell_val_nnbp_lxm)  / sell_val_nsp_lxm * 100,0
                tag: 'margin',
                country: country,
                l1:
                    this.orZero(cd.sellValNspL1m) == 0
                        ? 0
                        : (100 * (cd.sellValNspL1m - cd.sellValNnbpL1m)) / cd.sellValNspL1m,
                l3:
                    this.orZero(cd.sellValNspL3m) == 0
                        ? 0
                        : (100 * (cd.sellValNspL3m - cd.sellValNnbpL3m)) / cd.sellValNspL3m,
                l6:
                    this.orZero(cd.sellValNspL6m) == 0
                        ? 0
                        : (100 * (cd.sellValNspL6m - cd.sellValNnbpL6m)) / cd.sellValNspL6m,
                l12:
                    this.orZero(cd.sellValNspL12m) == 0
                        ? 0
                        : (100 * (cd.sellValNspL12m - cd.sellValNnbpL12m)) / cd.sellValNspL12m,
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
