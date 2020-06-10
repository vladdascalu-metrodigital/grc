import React from 'react';
import { storiesOf } from '@storybook/react';
import CreditTab from '../../service-components/CreditTab';

storiesOf('Services/Credit Tab', module)
    .add('Standard', () => <CreditTab />)
    .add('History', () => (
        <CreditTab
            historical={true}
            groupLimit={{ exhausted: 1200, granted: 5000, customerWish: 7000 }}
            customer={{ name: 'Customer A', email: 'test@gmail.com', phone: '1239843' }}
            customers={[
                { name: 'Customer A', storeNumber: 10, number: 99 },
                { name: 'Customer B', storeNumber: 10, number: 98 },
                { name: 'Customer C', storeNumber: 10, number: 97 },
            ]}
        />
    ));
