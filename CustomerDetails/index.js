import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Moment from 'react-moment';
import './index.scss';
import {displayName} from '../Util/index';
import {lookup} from '../Util/translations';

export default class CustomerDetails extends Component {

    describeTerm(term, description) {
        return (term && description)
            ? [<dt key='dt'>{lookup(term)}</dt>, <dd key='dd'>{description}</dd>]
            : null;
    }

    printAndBr() {
        const nonNullArgs = Array.prototype.slice.call(arguments).filter(a => a !== null && a !== undefined);
        return nonNullArgs.length > 0
            ? [nonNullArgs.join(' '), <br key='br'/>]
            : null;
    }

    printDate(date, withRelative = true) {
        if (!date) {
            return null;
        }
        return (
            <div className='registration-date'>
                <Moment className='absolute' format='LL'>{date}</Moment>
                {withRelative && <Moment className='relative' fromNow={true}>{date}</Moment>}
            </div>
        );
    }

    displayName() {
        return displayName(this.props.customer);
    }

    displayCustomerBasicDetails(c) {
        if (c.country && c.country=='DE' && c.legalFormDescription) {
            return (<dl>
                    {this.describeTerm('mrc.customerdetails.fields.customernumber', `${c.storeNumber}/${c.customerNumber}`)}
                        {this.describeTerm('mrc.customerdetails.fields.taxnumber', c.vatSpecNumber)}
                    {this.describeTerm('mrc.customerdetails.fields.vateunumber', c.vatEuNumber)}
                    {this.describeTerm('mrc.customerdetails.fields.legalform', c.legalForm)}
                    {this.describeTerm('mrc.customerdetails.fields.legalformdescription', c.legalFormDescription)}
                </dl>);
        }
        return (<dl>
                {this.describeTerm('mrc.customerdetails.fields.customernumber', `${c.storeNumber}/${c.customerNumber}`)}
                {this.describeTerm('mrc.customerdetails.fields.taxnumber', c.vatSpecNumber)}
                {this.describeTerm('mrc.customerdetails.fields.vateunumber', c.vatEuNumber)}
                {this.describeTerm('mrc.customerdetails.fields.legalform', c.legalForm)}
            </dl>);
    }

    render() {
        const c = this.props.customer;
        const blockingContent = this.props.blockingContent;
        if (!c) return null;
        return (<div className='mrc-customer-details' id={c.storeNumber+'/'+c.customerNumber}>
                <section className='mrc-detail'>
                    {this.displayCustomerBasicDetails(c)}
                    <address>
                        {lookup('mrc.customerdetails.fields.email')+':'} {this.printAndBr(c.email)}
                        {lookup('mrc.customerdetails.fields.phone')+':'} {this.printAndBr(c.phoneNumber)}
                        {lookup('mrc.customerdetails.fields.mobile')+':'} {this.printAndBr(c.mobilePhoneNumber)}
                        <br/>
                        {lookup('mrc.customerdetails.fields.street')+':'} {this.printAndBr(c.street, c.houseNumber)}
                        {lookup('mrc.customerdetails.fields.zipcity')+':'} <abbr title='ZIP'>{c.zipCode}</abbr> <abbr title='City'>{c.city}</abbr>
                    </address>
                    <div>
                        {lookup('mrc.customerdetails.fields.registration')+':'} {this.printDate(c.registrationDate)}
                    </div>
                    <br key='br'/>
                    {blockingContent}

                    {c.country && c.country=='DE' &&
                    (
                    <dl>
                        {c.branchId && lookup('mrc.customerdetails.fields.branchid')+':'} {this.printAndBr(c.branchId)}
						 {c.branchDescription && lookup('mrc.customerdetails.fields.branchdescription')+':'} {this.printAndBr(c.branchDescription)}
                         {c.segment && lookup('mrc.customerdetails.fields.segment')+':'}  {this.printAndBr(c.segment)}
                         {c.companyFoundationDate && lookup('mrc.customerdetails.fields.companyfoundationdate')+':'} 
                         {this.printDate(c.companyFoundationDate)}
					</dl>
                     )}    
                </section>
        </div>);
    }
}

CustomerDetails.propTypes = {
    customer: PropTypes.object,
    blockingContent: PropTypes.object
};


