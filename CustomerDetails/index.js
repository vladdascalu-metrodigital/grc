import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Moment from 'react-moment';
import './index.scss';
import {displayName} from '../../global/Util/index';
import {lookup} from '../../global/Util/translations';

const COOKIE_NAME = 'MRC_LOCALE';

export default class CustomerDetails extends Component {

    describeTerm(term, description) {
        return (term && description)
            ? [<dt key='dt'>{lookup(term)}</dt>, <dd key='dd'>{description}</dd>]
            : null;
    }

    getLocale() {
        var match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
        if (match) return match[2];
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
        var localeDate = new Date(date).toLocaleDateString(this.getLocale(), {year: 'numeric', month: 'long', day: 'numeric' });
        return (
            <div className='registration-date'>
                {localeDate}
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
                <section className='details'>
                    <h3>{this.displayName()}</h3>
                    <dl>
                        {this.describeTerm('mrc.customerdetails.fields.customernumber', `${c.storeNumber}/${c.customerNumber}`)}
                        {this.describeTerm('mrc.customerdetails.fields.taxnumber', c.vatSpecNumber)}
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
                </section>
        </div>);
    }
}

CustomerDetails.propTypes = {
    customer: PropTypes.object,
};


