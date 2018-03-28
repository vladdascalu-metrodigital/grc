import React from 'react';
import {AbstractCustomerDetails} from './AbstractCustomerDetails';

export default class CustomerDetailsEN extends AbstractCustomerDetails {

    renderDetails() {
        const c = this.props.customer;
        return (
            <div className='mrc-customer-details'>
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
            </div>
        );
    }

}

// For PropTypes see AbstractCustomerDetails.js
