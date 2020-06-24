import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../Sales/sales.scss';
import '../../../Sales/data-table.scss';
import { lookup } from '../../../Util/translations';
import { Accordion, Collapsible } from '../../../Accordion';
import * as _ from 'lodash';
import { Table } from '../../../Table';

export default class Sales extends Component {
    wrapCurrency(value, sales) {
        if (value === null) {
            return <span>n/a</span>;
        }
        if (sales.original.tag === 'purchase' || sales.original.tag === 'invoices') {
            return <mrc-number>{value}</mrc-number>;
        } else if (sales.original.tag === 'margin') {
            return (
                <span>
                    <mrc-number>{value}</mrc-number>%
                </span>
            );
        } else {
            return <mrc-number show-currency-for-country={sales.original.country}>{value}</mrc-number>;
        }
    }

    sales(customer, country) {
        const columns = [
            { Header: '', accessor: 'name' },
            { Header: 'L1M', accessor: 'l1m', renderFn: this.wrapCurrency },
            { Header: 'L3M', accessor: 'l3m', renderFn: this.wrapCurrency },
            { Header: 'L6M', accessor: 'l6m', renderFn: this.wrapCurrency },
            { Header: 'L12M', accessor: 'l12m', renderFn: this.wrapCurrency },
        ];

        const data = [
            { tag: 'purchase', name: lookup('mrc.mdw.numberofpurchase'), ...customer.purchasesQuintet },
            { tag: 'invoices', name: lookup('mrc.mdw.numberofinvoices'), ...customer.invoicesQuintet },
            { name: lookup('mrc.mdw.totalturnover'), renderFn: this.wrapCurrency, ...customer.totalQuintet },
            {
                name: lookup('mrc.mdw.totalgrossprofit'),
                renderFn: this.wrapCurrency,
                ...customer.totalGrossProfitQuintet,
            },
            { tag: 'margin', name: lookup('mrc.mdw.totalmargin'), ...customer.totalMarginQuintet },
        ];

        return (
            <div className="mrc-scoring-data">
                <Table
                    columns={columns}
                    data={data.map(e => {
                        return { ...e, country: country };
                    })}
                    className={'mrc-data-table'}
                    title={lookup('mrc.mdw.salesoverview')}
                />
            </div>
        );
    }

    merchendise(customer, country) {
        if (_.isEmpty(customer.behaviorQuintets)) {
            return null;
        }
        const countrySufix = country ? '-' + country : '';

        const columns = [
            { Header: '', accessor: 'name' },
            { Header: 'L1M', accessor: 'quintetValues.l1m', renderFn: this.wrapCurrency },
            { Header: 'L3M', accessor: 'quintetValues.l3m', renderFn: this.wrapCurrency },
            { Header: 'L6M', accessor: 'quintetValues.l6m', renderFn: this.wrapCurrency },
            { Header: 'L12M', accessor: 'quintetValues.l12m', renderFn: this.wrapCurrency },
        ];

        const data = customer.behaviorQuintets.map(bq => {
            return {
                name: lookup('mrc.mdw.behaviour-' + bq.behaviouralCode + countrySufix),
                country: country,
                ...bq,
            };
        });

        return (
            <div className="mrc-scoring-data">
                <Table
                    columns={columns}
                    data={data}
                    className={'mrc-data-table'}
                    title={lookup('mrc.mdw.merchandisegroupturnover')}
                />
            </div>
        );
    }

    render() {
        if (!_.some(this.props.salesOverviews)) {
            return <div className="mrc-detail">{lookup('mrc.mdw.nodataavailable')}</div>;
        }
        // Country is retrieved from the first customer in the list that has a country.
        const realCustomer = _.find(
            this.props.salesOverviews,
            customer => !_.isNil(_.get(customer, 'customerId.country'))
        );
        const country = realCustomer ? realCustomer.customerId.country : '';

        const collapsibles = this.props.salesOverviews.map((customer, i) => {
            const key = customer.customerId.storeNumber + '/' + customer.customerId.customerNumber;
            const trigger = (
                <div className="mrc-customer-trigger">
                    <span>{lookup(customer.displayName)}</span>
                </div>
            );

            return (
                <Collapsible open={i === 0} key={key} trigger={trigger}>
                    <div className="mrc-details">
                        {this.sales(customer, country)}
                        {this.merchendise(customer, country)}
                    </div>
                </Collapsible>
            );
        });

        return <Accordion className="mrc-sales-accordion"> {collapsibles} </Accordion>;
    }
}

Sales.propTypes = {
    salesOverviews: PropTypes.array,
};
