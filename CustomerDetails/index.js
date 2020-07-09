import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as _ from 'lodash';

import { lookup } from '../Util/translations';
import { displayName } from '../Util/index';
import printDate from '../Util/DateUtils';

import DefinitionList from '../DefinitionList';
import MrcDate from '../MrcDate';

import './index.scss';

export default class CustomerDetails extends Component {
    describeTerm(term, description) {
        return term && description ? [<dt key="dt">{lookup(term)}</dt>, <dd key="dd">{description}</dd>] : null;
    }

    printAndBr() {
        const nonNullArgs = Array.prototype.slice.call(arguments).filter((a) => a !== null && a !== undefined);
        return nonNullArgs.length > 0 ? [nonNullArgs.join(' '), <br key="br" />] : null;
    }

    displayName() {
        return displayName(this.props.customer);
    }

    displayCustomerBasicDetails(
        country,
        storeNumber,
        customerNumber,
        vatSpecNumber,
        vatEuNumber,
        legalForm,
        legalFormDescription
    ) {
        const list = [];
        (_.isEmpty(storeNumber) || !_.isEmpty(customerNumber)) &&
            list.push({
                term: 'mrc.customerdetails.fields.customernumber',
                description: `${storeNumber}/${customerNumber}`,
            });
        list.push({ term: 'mrc.customerdetails.fields.taxnumber', description: vatSpecNumber });
        list.push({ term: 'mrc.customerdetails.fields.vateunumber', description: vatEuNumber });
        list.push({ term: 'mrc.customerdetails.fields.legalform', description: legalForm });
        list.push({ term: 'mrc.customerdetails.fields.legalformdescription', description: legalFormDescription });

        return !_.isEmpty(list) ? <DefinitionList list={list} /> : null;
    }

    displayNaturalPersonDetails(companyOwnerLastName, companyOwnerFirstName, birthDay) {
        const list = [];
        !_.isEmpty(companyOwnerLastName) &&
            list.push({ term: 'mrc.customerdetails.fields.companyOwnerLastName', description: companyOwnerLastName });
        !_.isEmpty(companyOwnerFirstName) &&
            list.push({ term: 'mrc.customerdetails.fields.companyOwnerFirstName', description: companyOwnerFirstName });
        !_.isEmpty(birthDay) &&
            list.push({
                term: 'mrc.customerdetails.fields.birthDay',
                description: <MrcDate>{birthDay}</MrcDate>,
            });

        return !_.isEmpty(list) ? <DefinitionList list={list} /> : null;
    }

    displayContacts(email, phoneNumber, mobilePhoneNumber) {
        return (
            <DefinitionList
                list={[
                    { term: 'mrc.customerdetails.fields.email', description: email },
                    { term: 'mrc.customerdetails.fields.phone', description: phoneNumber },
                    { term: 'mrc.customerdetails.fields.mobile', description: mobilePhoneNumber },
                ]}
            />
        );
    }

    displayAddress(street, houseNumber, zipCode, city) {
        const list = [];
        (!_.isEmpty(street) || !_.isEmpty(houseNumber)) &&
            list.push({ term: 'history.street', description: street + ' ' + houseNumber });
        (!_.isEmpty(zipCode) || !_.isEmpty(city)) &&
            list.push({
                term: <span>{lookup('history.zipCode') + '/' + lookup('history.city')}</span>,
                description: zipCode + ' ' + city,
            });

        return <DefinitionList list={list} />;
    }

    displayRegistrationDate(registrationDate) {
        if (_.isEmpty(registrationDate)) {
            return null;
        }
        return (
            <DefinitionList
                list={[
                    {
                        term: 'mrc.customerdetails.fields.registration',
                        description: printDate(registrationDate, true),
                    },
                ]}
            />
        );
    }

    displayCompanyDetails(branchId, branchDescription, segment, companyFoundationDate) {
        const list = [];
        list.push({ term: 'mrc.customerdetails.fields.branchid', description: branchId });
        list.push({ term: 'mrc.customerdetails.fields.branchdescription', description: branchDescription });
        list.push({ term: 'mrc.customerdetails.fields.segment', description: segment });
        !_.isEmpty(companyFoundationDate) &&
            list.push({
                term: 'mrc.customerdetails.fields.companyfoundationdate',
                description: printDate(companyFoundationDate),
            });

        return !_.isEmpty(list) ? <DefinitionList list={list} /> : null;
    }

    render() {
        const c = this.props.customer;
        const blockingContent = this.props.blockingContent;
        if (!c) return null;
        return (
            <div className="mrc-customer-details" id={c.storeNumber + '/' + c.customerNumber}>
                <section className="mrc-detail">
                    {this.displayCustomerBasicDetails(
                        c.country,
                        c.storeNumber,
                        c.customerNumber,
                        c.vatSpecNumber,
                        c.vatEuNumber,
                        c.legalForm,
                        c.legalFormDescription
                    )}
                    {this.displayNaturalPersonDetails(c.companyOwnerLastName, c.companyOwnerFirstName, c.birthDay)}
                    {this.displayContacts(c.email, c.phoneNumber, c.mobilePhoneNumber)}
                    {this.displayAddress(c.street, c.houseNumber, c.zipCode, c.city)}
                    {this.displayRegistrationDate(c.registrationDate)}
                    {blockingContent}
                    {this.displayCompanyDetails(c.branchId, c.branchDescription, c.segment, c.companyFoundationDate)}
                </section>
            </div>
        );
    }
}

CustomerDetails.propTypes = {
    customer: PropTypes.object,
    blockingContent: PropTypes.object,
};
