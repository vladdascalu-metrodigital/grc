import React from 'react';
import { storiesOf } from '@storybook/react';

import CreditCorrectionCustomerStatus from '../CreditCorrection/CustomerStatus';
import CreditCorrectionCreditData from '../CreditCorrection/CreditData';
import CreditCorrectionRequest from '../CreditCorrection/CreditCorrection';
import CreditCorrectionRequestSubmitted from '../CreditCorrection/CreditCorrection/RequestSubmitted';

storiesOf('CreditCorrection/CustomerStatus', module)
    .add('standard', () => (
        <CreditCorrectionCustomerStatus
            customers={{
                data: {
                    customers: [
                        {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: 'Anylastname',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            legalFormDescription: 'Test Description',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 123.4,
                            customerLastName: 'Anylastname',
                            vatSpecNumber: '123/78234/8901',
                            email: 'someone@example.com',
                            mobilePhoneNumber: '+49 160 98765432',
                            blockingReason: '30',
                            checkoutCheckCode: 30,
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '12348',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: 'Anyfirstname',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: 'Anyfirstname',
                            creditSettleFrequencyCd: '',
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                        },
                        ,
                        {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: '',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 1711.4,
                            customerLastName: '',
                            vatSpecNumber: null,
                            email: '',
                            mobilePhoneNumber: '',
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '88',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: '',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: '',
                            creditSettleFrequencyCd: '',
                            blockingReason: null,
                            checkoutCheckCode: null,
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                        },
                    ],
                    precheckErrors: [],
                },
                loading: false,
            }}
            loadPendingRequest={data => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('constststst1');
                        return {};
                    });
            }}
            countriesWithDifferentBlockingCodes={['DE']}
            loadCustomerData={value => console.log(value)}
            loadRecentRequests={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12348',
                },
                path: '/customerstatus/:country/:storeNumber/:customerNumber/:show?',
                url: '/customerstatus/DE/10/12348',
            }}
            pendingRequest={{}}
            recentRequests={{
                data: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12346',
                    progressBar: {
                        currentStep: 3,
                        totalSteps: 4,
                        phase: 'contracting',
                    },
                    requests: [
                        {
                            requestId: '1',
                            url: 'http://localhost:8080/history/items/request/1',
                            requestStatus: {
                                trafficLight: 'yellow',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 15000,
                                groupAmount: 10000,
                                creditProduct: 'METRO Cash',
                                creditPeriod: '3',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Pending',
                                position: 'CM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: true,
                            },
                        },
                        {
                            requestId: '7',
                            url: 'http://localhost:8080/history/items/correditcorrection/7',
                            requestStatus: {
                                trafficLight: 'red',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 12000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Blocked',
                                position: 'CM',
                                requestType: 'CREDIT_CORRECTION',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                    ],
                },
            }}
            request={{ data: null, loading: false }}
            requestQuick={customer => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('to success page');
                        return e;
                    });
            }}
            isTablet={true}
        />
    ))
    .add('standard pending request', () => (
        <CreditLimitCustomerStatus
            customers={{
                data: {
                    customers: [
                        {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: 'Anylastname',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            legalFormDescription: 'Test Description',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 123.4,
                            customerLastName: 'Anylastname',
                            vatSpecNumber: '123/78234/8901',
                            email: 'someone@example.com',
                            mobilePhoneNumber: '+49 160 98765432',
                            blockingReason: '30',
                            checkoutCheckCode: 30,
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '12348',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: 'Anyfirstname',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: 'Anyfirstname',
                            creditSettleFrequencyCd: '',
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                        },
                    ],
                    precheckErrors: [
                        { reason: 'strategy.init.failed.runningRequest', field: '', customers: ['DE/10/12348'] },
                    ],
                },
                loading: false,
            }}
            loadPendingRequest={data => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('constststst1');
                        return {};
                    });
            }}
            countriesWithDifferentBlockingCodes={['DE']}
            loadCustomerData={value => console.log(value)}
            loadRecentRequests={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12348',
                },
                path: '/customerstatus/:country/:storeNumber/:customerNumber/:show?',
                url: '/customerstatus/DE/10/12348',
            }}
            pendingRequest={{
                data: {
                    id: '59fb48c8-ed3c-4249-bcbf-0157dbe90dfa',
                    creationTimestamp: '2020-05-04T07:47:46Z',
                    attachments: [],
                    comments: [],
                    requestedItems: [
                        {
                            id: '3636646d-0b3c-4d2e-bb3b-5098b721b4e6',
                            creditData: {
                                id: '982dcee2-a81a-4712-b374-046a675503b3',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 123.4,
                                requestedCustomer: true,
                                customerLastName: 'Anylastname',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12348',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12348',
                                storeAndCustomerNumber: '10_12348',
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: null,
                            customerSapId: {
                                country: 'PK',
                                storeNumber: '10',
                                customerNumber: '555',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                        {
                            id: 'dbfb70c2-8321-4321-b972-4ae818ec23dc',
                            creditData: {
                                id: 'da82818f-a914-404b-8d79-c251c1251135',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 0,
                                customerLastName: 'Anylastname',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12349',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                storeAndCustomerNumber: null,
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: null,
                            customerSapId: {
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                    ],
                    creditProgram: null,
                    submitInfo: null,
                    requestedCustomerId: {
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12348',
                    },
                    fileTypes: ['general'],
                    collaterals: null,
                    requestDisabled: false,
                    containsContracting: true,
                    collateralAttachments: [],
                    editable: true,
                    customerIds: [
                        {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12348',
                            storeAndCustomerNumber: null,
                        },
                    ],
                    customerSapIds: [],
                },
            }}
            recentRequests={{
                data: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12346',
                    progressBar: {
                        currentStep: 3,
                        totalSteps: 4,
                        phase: 'contracting',
                    },
                    requests: [
                        {
                            requestId: '1',
                            url: 'http://localhost:8080/history/items/request/1',
                            requestStatus: {
                                trafficLight: 'yellow',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 15000,
                                groupAmount: 10000,
                                creditProduct: 'METRO Cash',
                                creditPeriod: '3',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Pending',
                                position: 'CM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: true,
                            },
                        },
                        {
                            requestId: '7',
                            url: 'http://localhost:8080/history/items/correditcorrection/7',
                            requestStatus: {
                                trafficLight: 'red',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 12000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Blocked',
                                position: 'CM',
                                requestType: 'CREDIT_CORRECTION',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                    ],
                },
            }}
            request={{ data: null, loading: false }}
            requestQuick={customer => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('to success page');
                        return e;
                    });
            }}
            isTablet={true}
        />
    ));

storiesOf('CreditCorrection/CreditData', module).add('standard status', () => (
    <CreditCorrectionCreditData
        key={'1'}
        headerTitle={'CREDIT REQUEST for Test User'}
        paymentReadyToBeSelected={true}
        requestedItem={{
            id: '3636646d-0b3c-4d2e-bb3b-5098b721b4e6',
            creditData: {
                id: '982dcee2-a81a-4712-b374-046a675503b3',
                amount: null,
                creditProduct: null,
                creditPeriod: null,
                debitType: null,
            },
            customer: {
                country: 'DE',
                lastName: 'Anylastname',
                storeNumber: '10',
                customerNumber: '115',
                currentPayment: {
                    creditProduct: 'mrc.payment.METRO_Cash',
                    creditPeriod: 'mrc.payment.3',
                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                    backend: {
                        paymentAllowanceCd: 3,
                        creditSettleTypeCd: 1,
                        creditSettlePeriodCd: 3,
                        creditSettleFrequencyCd: null,
                        stringRepresentation: '3_1_3_null',
                    },
                },
                availablePayments: [
                    {
                        creditProduct: 'mrc.payment.METRO_Cash',
                        creditPeriod: 'mrc.payment.9',
                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                        backend: {
                            paymentAllowanceCd: 3,
                            creditSettleTypeCd: 1,
                            creditSettlePeriodCd: 9,
                            creditSettleFrequencyCd: null,
                            stringRepresentation: '3_1_9_null',
                        },
                    },
                    {
                        creditProduct: 'mrc.payment.METRO_Cash',
                        creditPeriod: 'mrc.payment.29',
                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                        backend: {
                            paymentAllowanceCd: 3,
                            creditSettleTypeCd: 1,
                            creditSettlePeriodCd: 29,
                            creditSettleFrequencyCd: null,
                            stringRepresentation: '3_1_29_null',
                        },
                    },
                    {
                        creditProduct: 'mrc.payment.METRO_Cash',
                        creditPeriod: 'mrc.payment.41',
                        debitType: 'mrc.payment.Einzugsermaechtigung',
                        backend: {
                            paymentAllowanceCd: 3,
                            creditSettleTypeCd: 3,
                            creditSettlePeriodCd: 41,
                            creditSettleFrequencyCd: null,
                            stringRepresentation: '3_3_41_null',
                        },
                    },
                ],
            },
            customerId: {
                salesLine: null,
                country: 'PK',
                storeNumber: '10',
                customerNumber: '555',
                storeAndCustomerNumber: null,
            },
            currentLimitExpiry: {
                limitExpiryDate: '2020-05-04T07:47:46Z',
                limitExpiryReminderDays: 14,
                resetToLimitAmount: 0,
            },
            customerSapId: {
                country: 'PK',
                storeNumber: '10',
                customerNumber: '555',
                typeCd: 'NORM',
            },
            valid: false,
        }}
        setCreditData={value => console.log(value)}
        setValidity={value => console.log(value)}
        handleRequestedGroupLimitChange={value => console.log(value)}
        canCorrect={true}
        isNewCorrection={true}
        onBlockingChange={value => console.log(value)}
        blockingValue={'30'}
        blockingOptions={['HARDBLOCK', 'SOFTBLOCK']}
        blockingLabel={'mrc.blocking.customer-dropdown'}
        blockingItemId={'3636646d-0b3c-4d2e-bb3b-5098b721b4e6'}
        registerCallbackBlocking={value => console.log(value)}
    />
));

storiesOf('CreditCorrection/CreditCorrection', module)
    .add('standard request', () => (
        <CreditCorrectionRequest
            cleanup={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            loadRequest={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    roleKey: 'limitCheck',
                    template: '%limitrequests%2F{requestid}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%limitrequests%2F{requestid}',
            }}
            isTablet={true}
            request={{
                data: {
                    id: '59fb48c8-ed3c-4249-bcbf-0157dbe90dfa',
                    creationTimestamp: '2020-05-04T07:47:46Z',
                    canCorrect: true,
                    attachments: [],
                    comments: [],
                    requestedItems: [
                        {
                            id: '3636646d-0b3c-4d2e-bb3b-5098b721b4e6',
                            creditData: {
                                id: '982dcee2-a81a-4712-b374-046a675503b3',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 10000,
                                requestedCustomer: true,
                                customerLastName: 'Anylastnamo',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12348',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12348',
                                storeAndCustomerNumber: '10_12348',
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            customerSapId: {
                                country: 'PK',
                                storeNumber: '10',
                                customerNumber: '555',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                        {
                            id: 'dbfb70c2-8321-4321-b972-4ae818ec23dc',
                            creditData: {
                                id: 'da82818f-a914-404b-8d79-c251c1251135',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 0,
                                customerLastName: 'Anylastname',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12349',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                storeAndCustomerNumber: null,
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: null,
                            customerSapId: {
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                    ],
                    creditProgram: null,
                    submitInfo: null,
                    requestedCustomerId: {
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12348',
                    },
                    fileTypes: ['general'],
                    collaterals: null,
                    requestDisabled: false,
                    containsContracting: true,
                    collateralAttachments: [
                        {
                            id: '43e6b4cf-2d21-4549-a087-658fc2d8a9d5',
                            contentUri: 'www.example.com',
                            title: 'Test title',
                            size: 1000,
                            contentType: 'text/html',
                            filename: 'test file name',
                            uploadTimestamp: '2020-05-04T08:39:42Z',
                            uploaderPosition: 'CC',
                            uploaderPrincipalName: 'Name Pricipal',
                            fileType: 'bank_guarantee',
                            expiryDate: '2020-05-04T08:39:42Z',
                            amount: 1000,
                            metadataJson:
                                '{"country":"DE","type":"bank_guarantee","label":"mrc.attachments.types.bank_guarantee","remark":"Collaterals","is_collateral":true,"fields":[{"field_label":"mrc.attachments.fields.bank_guarantee.amount","data_type":"Double","mandatory":true,"field_in_db":"amount","value":1234},{"field_label":"mrc.attachments.fields.bank_guarantee.validity_date","data_type":"Date","mandatory":true,"field_in_db":"expiry_date","validation_operation":"GREATER_THAN_AND_EQUALS","validation_argument":"TODAY","value":1585087200000}]}',
                        },
                        {
                            id: 'fa075664-5ea3-411b-9149-7e5b4c290007',
                            contentUri: 'www.exampleTest.com',
                            title: 'Test title 1',
                            size: 1100,
                            contentType: 'text/html',
                            filename: 'test file name 1',
                            uploadTimestamp: '2020-05-04T08:39:42Z',
                            uploaderPosition: 'CC',
                            uploaderPrincipalName: 'Name Pricipal 1',
                            fileType: 'contract',
                            expiryDate: '2020-05-04T08:39:42Z',
                            amount: 2000,
                            metadataJson:
                                '{"country":"DE","type":"contract","label":"mrc.attachments.types.contract","remark":"Digital version to improve efficiency","fields":[{"field_label":"mrc.attachments.fields.contract.start_date","data_type":"Date","mandatory":true,"validation_operation":"LESS_THAN_AND_EQUALS","validation_argument":"TODAY","value":1580508000000},{"field_label":"mrc.attachments.fields.contract.expiration_date","data_type":"Date","mandatory":true,"field_in_db":"expiry_date","validation_operation":"GREATER_THAN_AND_EQUALS","validation_argument":"TODAY","value":1582927200000}]}',
                        },
                    ],
                    editable: true,
                    customerIds: [
                        {
                            salesLine: null,
                            country: 'PK',
                            storeNumber: '10',
                            customerNumber: '555',
                            storeAndCustomerNumber: null,
                        },
                        {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12349',
                            storeAndCustomerNumber: null,
                        },
                        {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12348',
                            storeAndCustomerNumber: null,
                        },
                        {
                            salesLine: null,
                            country: 'CN',
                            storeNumber: '10',
                            customerNumber: '88',
                            storeAndCustomerNumber: null,
                        },
                    ],
                    customerSapIds: [
                        {
                            country: 'PK',
                            storeNumber: '10',
                            customerNumber: '555',
                            typeCd: 'NORM',
                        },
                        {
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12349',
                            typeCd: 'NORM',
                        },
                    ],
                },
            }}
            addComment={value => console.log(value)}
            addAttachment={value => console.log(value)}
            restoreAttachment={value => console.log(value)}
            deleteAttachment={value => console.log(value)}
            setCreditData={value => console.log(value)}
            setLimitExpiry={value => console.log(value)}
            submitRequest={value => console.log(value)}
            cancel={value => console.log(value)}
            history={{
                location: {
                    pathname: 'request',
                },
            }}
            isNewCorrection={true}
        />
    ))
    .add('standard submitted', () => (
        <CreditCorrectionRequestSubmitted
            data={{
                id: '59fb48c8-ed3c-4249-bcbf-0157dbe90dfa',
                creationTimestamp: '2020-05-04T07:47:46Z',
                attachments: [],
                comments: [],
                requestedItems: [
                    {
                        id: '3636646d-0b3c-4d2e-bb3b-5098b721b4e6',
                        creditData: {
                            id: '982dcee2-a81a-4712-b374-046a675503b3',
                            amount: null,
                            creditProduct: null,
                            creditPeriod: null,
                            debitType: null,
                        },
                        customer: {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: 'Anylastname',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            legalFormDescription: 'Test Description',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 10000,
                            requestedCustomer: true,
                            customerLastName: 'Anylastnamo',
                            vatSpecNumber: '123/78234/8901',
                            email: 'someone@example.com',
                            mobilePhoneNumber: '+49 160 98765432',
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '12348',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: 'Anyfirstname',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: 'Anyfirstname',
                            creditSettleFrequencyCd: '',
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                            availablePayments: [
                                {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.9',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 9,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_9_null',
                                    },
                                },
                                {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.31',
                                    debitType: 'mrc.payment.Basislastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 3,
                                        creditSettlePeriodCd: 31,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_3_31_null',
                                    },
                                },
                            ],
                        },
                        customerId: {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12348',
                            storeAndCustomerNumber: '10_12348',
                        },
                        currentLimitExpiry: {
                            limitExpiryDate: '2020-05-04T07:47:46Z',
                            limitExpiryReminderDays: 14,
                            resetToLimitAmount: 0,
                        },
                        requestedLimitExpiry: {
                            limitExpiryDate: '2020-05-04T07:47:46Z',
                            limitExpiryReminderDays: 14,
                            resetToLimitAmount: 0,
                        },
                        customerSapId: {
                            country: 'PK',
                            storeNumber: '10',
                            customerNumber: '555',
                            typeCd: 'NORM',
                        },
                        valid: false,
                        activationInfo: 'successful',
                    },
                    {
                        id: 'dbfb70c2-8321-4321-b972-4ae818ec23dc',
                        creditData: {
                            id: 'da82818f-a914-404b-8d79-c251c1251135',
                            amount: null,
                            creditProduct: null,
                            creditPeriod: null,
                            debitType: null,
                        },
                        customer: {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: 'Anylastname',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            legalFormDescription: 'Test Description',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 0,
                            customerLastName: 'Anylastname',
                            vatSpecNumber: '123/78234/8901',
                            email: 'someone@example.com',
                            mobilePhoneNumber: '+49 160 98765432',
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '12349',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: 'Anyfirstname',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: 'Anyfirstname',
                            creditSettleFrequencyCd: '',
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                            availablePayments: [
                                {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.9',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 9,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_9_null',
                                    },
                                },
                                {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.31',
                                    debitType: 'mrc.payment.Basislastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 3,
                                        creditSettlePeriodCd: 31,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_3_31_null',
                                    },
                                },
                            ],
                        },
                        customerId: {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12349',
                            storeAndCustomerNumber: null,
                        },
                        currentLimitExpiry: {
                            limitExpiryDate: '2020-05-04T07:47:46Z',
                            limitExpiryReminderDays: 14,
                            resetToLimitAmount: 0,
                        },
                        requestedLimitExpiry: null,
                        customerSapId: {
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12349',
                            typeCd: 'NORM',
                        },
                        valid: false,
                    },
                ],
                creditProgram: null,
                submitInfo: null,
                requestedCustomerId: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12348',
                },
                fileTypes: ['general'],
                collaterals: null,
                requestDisabled: false,
                containsContracting: true,
                collateralAttachments: [
                    {
                        id: '43e6b4cf-2d21-4549-a087-658fc2d8a9d5',
                        contentUri: 'www.example.com',
                        title: 'Test title',
                        size: 1000,
                        contentType: 'text/html',
                        filename: 'test file name',
                        uploadTimestamp: '2020-05-04T08:39:42Z',
                        uploaderPosition: 'CC',
                        uploaderPrincipalName: 'Name Pricipal',
                        fileType: 'bank_guarantee',
                        expiryDate: '2020-05-04T08:39:42Z',
                        amount: 1000,
                        metadataJson:
                            '{"country":"DE","type":"bank_guarantee","label":"mrc.attachments.types.bank_guarantee","remark":"Collaterals","is_collateral":true,"fields":[{"field_label":"mrc.attachments.fields.bank_guarantee.amount","data_type":"Double","mandatory":true,"field_in_db":"amount","value":1234},{"field_label":"mrc.attachments.fields.bank_guarantee.validity_date","data_type":"Date","mandatory":true,"field_in_db":"expiry_date","validation_operation":"GREATER_THAN_AND_EQUALS","validation_argument":"TODAY","value":1585087200000}]}',
                    },
                    {
                        id: 'fa075664-5ea3-411b-9149-7e5b4c290007',
                        contentUri: 'www.exampleTest.com',
                        title: 'Test title 1',
                        size: 1100,
                        contentType: 'text/html',
                        filename: 'test file name 1',
                        uploadTimestamp: '2020-05-04T08:39:42Z',
                        uploaderPosition: 'CC',
                        uploaderPrincipalName: 'Name Pricipal 1',
                        fileType: 'contract',
                        expiryDate: '2020-05-04T08:39:42Z',
                        amount: 2000,
                        metadataJson:
                            '{"country":"DE","type":"contract","label":"mrc.attachments.types.contract","remark":"Digital version to improve efficiency","fields":[{"field_label":"mrc.attachments.fields.contract.start_date","data_type":"Date","mandatory":true,"validation_operation":"LESS_THAN_AND_EQUALS","validation_argument":"TODAY","value":1580508000000},{"field_label":"mrc.attachments.fields.contract.expiration_date","data_type":"Date","mandatory":true,"field_in_db":"expiry_date","validation_operation":"GREATER_THAN_AND_EQUALS","validation_argument":"TODAY","value":1582927200000}]}',
                    },
                ],
                editable: true,
                customerIds: [
                    {
                        salesLine: null,
                        country: 'PK',
                        storeNumber: '10',
                        customerNumber: '555',
                        storeAndCustomerNumber: null,
                    },
                    {
                        salesLine: null,
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12349',
                        storeAndCustomerNumber: null,
                    },
                    {
                        salesLine: null,
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12348',
                        storeAndCustomerNumber: null,
                    },
                    {
                        salesLine: null,
                        country: 'CN',
                        storeNumber: '10',
                        customerNumber: '88',
                        storeAndCustomerNumber: null,
                    },
                ],
                customerSapIds: [
                    {
                        country: 'PK',
                        storeNumber: '10',
                        customerNumber: '555',
                        typeCd: 'NORM',
                    },
                    {
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12349',
                        typeCd: 'NORM',
                    },
                ],
            }}
        />
    ));
