import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import '../Util/imports';

import QuickCheck from '../QuickCheck';

storiesOf('QuickCheck', module).add('standard status', () => (
    <QuickCheck
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
                precheckErrors: [],
            },
            loading: false,
        }}
        countriesWithDifferentBlockingCodes={['DE']}
        loadCustomerData={(value) => console.log(value)}
        loadRecentRequests={(value) => console.log(value)}
        updateUiPageTitle={(value) => console.log(value)}
        showAuxControl={(value) => console.log(value)}
        match={{
            isExact: true,
            params: {
                country: 'DE',
                storeNumber: '10',
                customerNumber: '12348',
            },
            path: '/quickstatus/:country/:storeNumber/:customerNumber/:show?',
            url: '/quickstatus/DE/10/12348',
        }}
        pendingRequest={null}
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
        requestQuick={(customer) => {
            return fetch(`/creditlimit/test`)
                .then((resp) => resp.json())
                .catch((e) => {
                    console.log('to success page');
                    return e;
                });
        }}
        isTablet={true}
    />
));
