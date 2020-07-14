import React from 'react';
import { storiesOf } from '@storybook/react';

import DetailedCustomerTrigger from '../DetailedCustomerTrigger/presentation';

import '../Util/imports';

let customer = {
    id: '535d82f5-b44a-4776-8c2d-ce368f726902',
    firstName: 'ihbprq',
    lastName: 'kpciiqrzowimsjvxccl',
    country: 'DE',
    customerNumber: '112412',
    storeNumber: '46',
    vatSpecNumber: '999999999999999',
    legalForm: '2',
    email: '',
    phoneNumber: '43518953286',
    mobilePhoneNumber: '',
    street: 'xavjlhjmgxyjoe',
    houseNumber: '5',
    zipCode: '82049',
    city: 'kowlyifxhbewrnxleu',
    registrationDate: '2019-06-12T00:00:00.000+00:00',
    availablePayments: 'TOOOOO MUCH DATA',
    checkoutCheckCode: null,
    blockingReason: null,
    branchId: 'Z62',
    branchDescription: 'sonst. Dienstleistungen',
    segment: 'SCO',
    companyFoundationDate: '1991-04-17T00:00:00.000+00:00',
    legalFormDescription: 'GmbH',
    paymentAllowanceCd: '3',
    birthDay: null,
    companyOwnerLastName: 'wb',
    companyOwnerFirstName: 'wpk',
    limitExhaustion: 1013.17,
    requestedCustomer: true,
};

storiesOf('DetailedCustomerTrigger', module).add('Standard', () => (
    <DetailedCustomerTrigger
        customer={customer}
        current={1200}
        requested={1300}
        approved={1250}
        aDebitType={'aDebitType'}
        cDebitType={'cDebitType'}
        rDebitType={'rDebitType'}
        aProduct={'aProduct'}
        cProduct={'cProduct'}
        rProduct={'rProduct'}
        aPeriod={'aPeriod'}
        cPeriod={'cPeriod'}
        rPeriod={'rPeriod'}
        cLimitExpiryDate={'2020-04-21T12:10:46Z'}
        rLimitExpiryDate={'2020-04-21T12:10:46Z'}
        cLimitExpiryValue={1234}
        rLimitExpiryValue={1233}
        isWithWarning={false}
    />
));
