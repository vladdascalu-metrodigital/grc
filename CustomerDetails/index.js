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

    render() {
        const c = this.props.customer;
        if (!c) return null;
        return (<div className='mrc-customer-details' id={c.storeNumber+'/'+c.customerNumber}>
                <section className='mrc-detail'>
                    <dl>
                        {this.describeTerm('mrc.customerdetails.fields.customernumber', `${c.storeNumber}/${c.customerNumber}`)}
                        {this.describeTerm('mrc.customerdetails.fields.taxnumber', c.vatSpecNumber)}
                        {this.describeTerm('mrc.customerdetails.fields.vateunumber', c.vatEuNumber)}
                        {this.describeTerm('mrc.customerdetails.fields.legalform', c.legalForm)}
                    </dl>
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
                     {/*<dl>
                        {c.blockingReason && this.describeTerm('mrc.blockingReason', lookup('mrc.blockingReason.message.'+c.blockingReason))}
                        {c.checkoutCheckCode && this.describeTerm('mrc.checkoutCheckCode', lookup('mrc.checkoutCheckCode.message.'+c.checkoutCheckCode))}
                    </dl>*/}
					{c.country && c.country=='DE' &&
                    (
                        <dl>
                            {c.branchId && ([<dt key='dt'>{lookup('mrc.branchId')+''}</dt>,<dd key='dd'>{c.branchId}</dd>])}
						    {c.branchDescription && ([<dt key='dt'>{lookup('mrc.branchDescription')+''}</dt>,<dd key='dd'>{c.branchDescription}</dd>])}
                            {c.segment && ([<dt key='dt'>{lookup('mrc.segment')+''}</dt>,<dd key='dd'>{c.segment}</dd>])}
                            {c.companyFoundationDate && ([<dt key='dt'>{lookup('mrc.companyFoundationDate')+''}</dt>,<dd key='dd'>
                            {c.companyFoundationDate}  (
                            {(moment.duration(moment().diff(c.companyFoundationDate))).years()} years)  </dd>])}
                         {c.legalFormDescription && ([<dt key='dt'>{lookup('mrc.legalFormsDescription')+''}</dt>,<dd key='dd'>{c.legalFormDescription}</dd>])}
					</dl>
                )}     
                </section>
        </div>);
    }
}

CustomerDetails.propTypes = {
    customer: PropTypes.object,
};


