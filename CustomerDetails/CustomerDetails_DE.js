import React from 'react';
import {AbstractCustomerDetails} from './AbstractCustomerDetails';

export default class CustomerDetailsDE extends AbstractCustomerDetails {

    renderDetails() {
        const c = this.props.customer;
        return (
            <div className='mrc-customer-details'>
                <h3>{this.displayName()}</h3>
                <dl>
                    {this.describeTerm('Kundennummer', `${c.storeNumber}/${c.customerNumber}`)}
                    {this.describeTerm('Steuernummer', c.vatSpecNumber)}
                    {this.describeTerm('Rechtsform', c.legalForm)}
                </dl>
                <address>
                    E-Mail: {this.printAndBr(c.email)}
                    Telefon: {this.printAndBr(c.phoneNumber)}
                    Mobil: {this.printAndBr(c.mobilePhoneNumber)}
                    <br/>
                    Straße: {this.printAndBr(c.street, c.houseNumber)}
                    Stadt: {this.printAndBr(c.zipCode, c.city)}
                </address>
                <div>
                    Registrierung: {this.printDate(c.registrationDate)}
                </div>
            </div>
        );
    }

}

// For PropTypes see AbstractCustomerDetails.js
