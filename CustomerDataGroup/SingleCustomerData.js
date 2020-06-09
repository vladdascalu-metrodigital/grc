import React, { Component } from 'react';

import BoxWithTitle, { TYPE as BOX_TYPE } from '../BoxWithTitle';
import ToggleBox from '../ToggleBox';
import CustomerToggler from './CustomerToggler';
import Grid, { GridItem } from '../Grid';
import ClientBlocked from '../ClientBlocked';
import Card from '../Card';
import VCard from '../VCard';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../KeyValueGroup';

import './index.scss';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';
import * as _ from 'lodash';
import { displayName } from '../Util';
import printDate from '../Util/DateUtils';

export default class SingleCustomerData extends Component {
    render() {
        const customer = this.props.customer;
        const blockingContent = this.createBlockingContent(customer);
        return (
            <ToggleBox
                initialShow={this.props.open}
                titleContent={
                    <CustomerToggler
                        name={displayName(customer)}
                        storeNumber={customer.storeNumber}
                        customerNumber={customer.customerNumber}
                        isBlocked={blockingContent != null}
                    />
                }
            >
                <Grid>
                    {blockingContent}
                    {this.createContactInfo(customer)}
                    {this.createBusinessInfo(customer)}
                </Grid>
            </ToggleBox>
        );
    }

    createContactInfo(customer) {
        return (
            <BoxWithTitle title={lookup('mrc.customerdata.contactInfo')} type={BOX_TYPE.SMALLER}>
                <Card isBlock dropShadow>
                    <VCard person={this.createPersonForVisitCard(customer)} />
                </Card>
            </BoxWithTitle>
        );
    }

    createBlockingContent(customer) {
        const countriesWithDifferentBlockingCodes = this.props.countriesWithDifferentBlockingCodes;
        const msgKeyPartCountry =
            customer.country &&
            countriesWithDifferentBlockingCodes &&
            countriesWithDifferentBlockingCodes.length > 0 &&
            countriesWithDifferentBlockingCodes.includes(customer.country)
                ? customer.country + '.'
                : '';
        const hasBlockingReason = customer.blockingReason != undefined && customer.blockingReason != null;
        const hasCheckoutCheckCode = customer.checkoutCheckCode != undefined && customer.checkoutCheckCode != null;
        if (hasBlockingReason || hasCheckoutCheckCode) {
            let blockingText = null;
            if (hasBlockingReason) {
                blockingText = lookup('mrc.blockingReason.message.' + msgKeyPartCountry + customer.blockingReason);
            }
            if (hasCheckoutCheckCode) {
                if (hasBlockingReason) {
                    blockingText = blockingText + ', ';
                }
                blockingText =
                    blockingText +
                    lookup('mrc.checkoutCheckCode.message.' + msgKeyPartCountry + customer.checkoutCheckCode);
            }

            return (
                <GridItem colSpan="all">
                    <ClientBlocked size="large" text={blockingText} />
                </GridItem>
            );
        }
        return null;
    }

    createPersonForVisitCard(customer) {
        let name = null;
        if (!_.isEmpty(customer.companyOwnerFirstName)) {
            name = customer.companyOwnerFirstName;
        }
        if (!_.isEmpty(customer.companyOwnerLastName)) {
            if (name != null) {
                name = name + ' ';
            }
            name = name + customer.companyOwnerLastName;
        }
        if (_.isEmpty(name)) {
            name = displayName(customer);
        }

        return {
            name: name,
            birthday: customer.birthday,
            street: customer.street,
            houseNumber: customer.houseNumber,
            zipCode: customer.zipCode,
            city: customer.city,
            mobilePhoneNumber: customer.mobilePhoneNumber,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
        };
    }

    createBusinessInfo(customer) {
        return (
            <BoxWithTitle title={lookup('mrc.customerdata.businessInfo')} type={BOX_TYPE.SMALLER}>
                <KeyValueGroup>
                    {this.createKeyValue('mrc.customerdetails.fields.taxnumber', customer.vatSpecNumber)}
                    {this.createKeyValue('mrc.customerdetails.fields.vateunumber', customer.vatEuNumber)}
                    {this.createKeyValue(
                        'mrc.customerdetails.fields.legalform',
                        this.createLegalFormContent(customer.legalForm, customer.legalFormDescription)
                    )}
                    <KeyValueRow spaced>
                        <Key></Key>
                        <Value></Value>
                    </KeyValueRow>

                    {this.createKeyValue(
                        'mrc.customerdetails.fields.branch',
                        this.createBranchContent(customer.branchId, customer.branchDescription)
                    )}
                    {this.createKeyValue('mrc.customerdetails.fields.segment', customer.segment)}
                    <KeyValueRow spaced>
                        <Key></Key>
                        <Value></Value>
                    </KeyValueRow>

                    {this.createKeyValue(
                        'mrc.customerdetails.fields.companyfoundationdate',
                        printDate(customer.companyFoundationDate)
                    )}
                    {this.createKeyValue(
                        'mrc.customerdetails.fields.registration',
                        printDate(customer.registrationDate, true)
                    )}
                </KeyValueGroup>
            </BoxWithTitle>
        );
    }

    createKeyValue(key, value) {
        return !_.isEmpty(value) ? (
            <KeyValueRow>
                <Key>{lookup(key)}</Key>
                <Value>{value}</Value>
            </KeyValueRow>
        ) : (
            <KeyValueRow>
                <Key>{lookup(key)}</Key>
                <Value>-</Value>
            </KeyValueRow>
        );
    }

    createLegalFormContent(legalForm, legalFormDescription) {
        let content = null;
        if (!_.isEmpty(legalForm)) {
            content = legalForm;
        }
        if (content != null && !_.isEmpty(legalFormDescription)) {
            content = content + ' - ' + legalFormDescription;
        }
        return content;
    }

    createBranchContent(branchId, branchDescription) {
        let content = null;
        if (!_.isEmpty(branchId)) {
            content = branchId;
        }
        if (content != null && !_.isEmpty(branchDescription)) {
            content = content + ' - ' + branchDescription;
        }
        return content;
    }
}

SingleCustomerData.propTypes = {
    customer: PropTypes.object.isRequired,
    countriesWithDifferentBlockingCodes: PropTypes.array,
    open: PropTypes.bool.isRequired,
};
