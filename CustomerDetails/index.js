import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Moment from 'react-moment';
import './index.scss';
import {displayName} from '../../global/Util/index';


export default class CustomerDetails extends Component {

    describeTerm(term, description) {
        return (term && description)
            ? [<dt key='dt'>{term}</dt>, <dd key='dd'>{description}</dd>]
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
                <section className='details'>
                    <h3>{this.displayName()}</h3>
                    <dl>
                        {this.describeTerm('Customer Number', `${c.storeNumber}/${c.customerNumber}`)}
                        {this.describeTerm('Tax Number', c.vatSpecNumber)}
                        {this.describeTerm('Legal Form', c.legalForm)}
                    </dl>
                    <address>
                        E-Mail: {this.printAndBr(c.email)}
                        Phone: {this.printAndBr(c.phoneNumber)}
                        Mobile: {this.printAndBr(c.mobilePhoneNumber)}
                        <br/>
                        Street: {this.printAndBr(c.street, c.houseNumber)}
                        ZIP/City: <abbr title='ZIP'>{c.zipCode}</abbr> <abbr title='City'>{c.city}</abbr>
                    </address>
                    <div>
                        Registration: {this.printDate(c.registrationDate)}
                    </div>
                </section>
        </div>);
    }
}

CustomerDetails.propTypes = {
    customer: PropTypes.object,
};


