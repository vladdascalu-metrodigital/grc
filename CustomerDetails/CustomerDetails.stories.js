import React from 'react';
import { storiesOf } from '@storybook/react';

import CustomerDetails from '../CustomerDetails';

storiesOf('CustomerDetails', module).add('CustomerDetails', () => (
    <CustomerDetails
        customer={{
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
            birthDay: '1970-10-09',
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
            customerNumber: '555',
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
        }}
        blockingContent={null}
    />
));
