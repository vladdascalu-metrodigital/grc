import React from 'react';
import NotificationLayout from '../../Notification/NotificationLayout';
import { lookup } from '../../Util/translations';
import {
    CUSTOMER_IN_PENDING,
    ERROR_CODES,
    NO_CUSTOMER_CHANGED,
    UNKNOWN_ERROR,
    VALIDATION_EMAIL_ERROR_ALL_ALREADY_DELETED,
    VALIDATION_EMAIL_ERROR_ALL_ALREADY_VERIFIED,
    VALIDATION_EMAIL_ERROR_ALREADY_DELETED,
    VALIDATION_EMAIL_ERROR_ALREADY_VERIFIED,
    VALIDATION_EMAIL_ERROR_INVALID,
    WAITING_FOR_HANDLING,
} from './Constants';
import * as _ from 'lodash';

export function mapStatusToErrorCode(status) {
    if (status === 409) {
        return CUSTOMER_IN_PENDING;
    }
    if (status === 204) {
        return NO_CUSTOMER_CHANGED;
    }
    return UNKNOWN_ERROR;
}

export function getErrorCode(data) {
    if (!data) {
        return UNKNOWN_ERROR;
    }

    return ERROR_CODES.includes(data) ? data : null;
}

export function displayCustomerName(customerAccount) {
    if (!_.isEmpty(customerAccount.customerFullName)) {
        return customerAccount.customerFullName;
    }

    return _.isEmpty(customerAccount.companyOwnerFullName) ? '' : customerAccount.companyOwnerFullName;
}

export function displayCustomerId(customerAccount) {
    return customerAccount.customerId.storeNumber + '/' + customerAccount.customerId.customerNumber;
}

export function createNotification(state) {
    if (_.isEmpty(state)) {
        return null;
    }
    if (state === WAITING_FOR_HANDLING) {
        return (
            <NotificationLayout
                messageType={'info'}
                message={lookup('mrc.dunningemailmanagement.editStatus.' + state)}
            />
        );
    }
    return (
        <NotificationLayout messageType={'error'} message={lookup('mrc.dunningemailmanagement.editStatus.' + state)} />
    );
}

export function createValidationMessage(validation) {
    if (_.isEmpty(validation)) {
        return null;
    }
    return <NotificationLayout messageType={'error'} message={lookup(validation)} />;
}

export function validateDunningEmailForCustomers(newDunningEmail, customers, selectedCustomerAccountIds) {
    if (_.isEmpty(newDunningEmail)) {
        return customers.some(
            (customer) => selectedCustomerAccountIds.includes(customer.accountId) && !_.isEmpty(customer.dunningEmail)
        )
            ? ''
            : VALIDATION_EMAIL_ERROR_ALL_ALREADY_DELETED;
    }

    if (!validateEmail(newDunningEmail)) {
        return VALIDATION_EMAIL_ERROR_INVALID;
    }

    return customers.every((customer) => validateCustomerChange(newDunningEmail, customer, selectedCustomerAccountIds))
        ? VALIDATION_EMAIL_ERROR_ALL_ALREADY_VERIFIED
        : '';
}

export function validateSingleDunningEmail(newDunningEmail, oldDunningEmail, dunningEmailStatus) {
    if (_.isEmpty(newDunningEmail)) {
        return _.isEmpty(oldDunningEmail) ? VALIDATION_EMAIL_ERROR_ALREADY_DELETED : '';
    }

    if (!validateEmail(newDunningEmail)) {
        return VALIDATION_EMAIL_ERROR_INVALID;
    }

    return validateDunningEmailChange(newDunningEmail, oldDunningEmail, dunningEmailStatus)
        ? VALIDATION_EMAIL_ERROR_ALREADY_VERIFIED
        : '';
}

function validateCustomerChange(newDunningEmail, customer, selectedCustomerAccountIds) {
    const oldDunningEmail = _.isEmpty(customer.dunningEmail) ? null : customer.dunningEmail.toLowerCase().trim();
    return (
        selectedCustomerAccountIds.includes(customer.accountId) &&
        validateDunningEmailChange(newDunningEmail, oldDunningEmail, customer.dunningEmailStatus)
    );
}

function validateDunningEmailChange(newDunningEmail, oldDunningEmail, dunningEmailStatus) {
    // TODO: country specific according to doi
    return newDunningEmail === oldDunningEmail && dunningEmailStatus === 'DOMAIN_VERIFIED';
}

function validateEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}
