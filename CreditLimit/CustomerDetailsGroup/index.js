import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import CustomerDetails from '../../CustomerDetails';
import { Accordion, Collapsible } from '../../Accordion';
import CustomerTrigger from '../../CustomerTrigger/presentation';
import './index.scss';
import { lookup } from '../../Util/translations';

export default class CustomerDetailsGroup extends Component {
    returnCustomerDetails(customer) {
        const countriesWithDifferentBlockingCodes = this.props.countriesWithDifferentBlockingCodes;
        const msgKeyPartCountry =
            customer.country &&
            countriesWithDifferentBlockingCodes &&
            countriesWithDifferentBlockingCodes.length > 0 &&
            countriesWithDifferentBlockingCodes.includes(customer.country)
                ? customer.country + '.'
                : '';
        var blockingContent = null;
        if (
            (customer.blockingReason != undefined && customer.blockingReason != null) ||
            (customer.checkoutCheckCode != undefined && customer.checkoutCheckCode != null)
        ) {
            blockingContent = (
                <dl>
                    {customer.blockingReason != undefined &&
                        customer.blockingReason != null && [
                            <dt key="dt">{lookup('mrc.blockingReason')}</dt>,
                            <dd key="dd">
                                {lookup('mrc.blockingReason.message.' + msgKeyPartCountry + customer.blockingReason)}
                            </dd>,
                        ]}
                    {customer.checkoutCheckCode != undefined &&
                        customer.checkoutCheckCode != null && [
                            <dt key="dt">{lookup('mrc.checkoutCheckCode')}</dt>,
                            <dd key="dd">
                                {lookup(
                                    'mrc.checkoutCheckCode.message.' + msgKeyPartCountry + customer.checkoutCheckCode
                                )}
                            </dd>,
                        ]}
                </dl>
            );
        }

        return <CustomerDetails customer={customer} blockingContent={blockingContent}></CustomerDetails>;
    }

    render() {
        if (!this.props.customers) return null;

        const collapsibles = this.props.customers.map((customer, i) => {
            const key = customer.storeNumber + '/' + customer.customerNumber;
            const trigger = <CustomerTrigger customer={customer} />;

            return (
                <Collapsible open={i === 0} key={key} trigger={trigger}>
                    {this.returnCustomerDetails(customer)}
                </Collapsible>
            );
        });

        return <Accordion className="mrc-customer-details-group">{collapsibles}</Accordion>;
    }
}

CustomerDetailsGroup.propTypes = {
    customers: PropTypes.array,
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
