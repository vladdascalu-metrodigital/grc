import React from 'react';
import { storiesOf } from '@storybook/react';
import CreditTab from '../../service-components/CreditTab';

storiesOf('Services/Credit Tab', module)
    .add('Standard', () => <CreditTab />)
    .add('History', () => (
        <CreditTab
            historical={true}
            country={'DE'}
            groupLimit={{ exhausted: 1200, granted: 5000, wish: 60000 }}
            customer={{ name: 'Customer A', email: 'test@gmail.com', phone: '1239843' }}
            customers={[
                {
                    name: 'Customer A',
                    storeNumber: 10,
                    number: 99,
                    limit: {
                        old: { amount: 12000, product: 'Metro Cash', period: '12', method: 'Basislastshriftmandat' },
                        wish: { amount: 30000, product: 'Metro Top', period: '12', method: 'Basislastshriftmandat' },
                        current: {
                            amount: 20000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                        expiry: { amount: null, date: null },
                    },
                },
                {
                    isBlocked: true,
                    name: 'Customer B',
                    storeNumber: 10,
                    number: 98,
                    limit: {
                        old: { amount: 12000, product: 'Metro Cash', period: '12', method: 'Basislastshriftmandat' },
                        wish: { amount: 30000, product: 'Metro Top', period: '12', method: 'Basislastshriftmandat' },
                        current: {
                            amount: 20000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                        expiry: { amount: 1000, date: '4/2/2020' },
                    },
                },
                {
                    name: 'Customer C',
                    storeNumber: 10,
                    number: 97,
                    limit: {
                        old: { amount: 12000, product: 'Metro Cash', period: '12', method: 'Basislastshriftmandat' },
                        wish: { amount: 30000, product: 'Metro Top', period: '12', method: 'Basislastshriftmandat' },
                        current: {
                            amount: 20000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                    },
                },
            ]}
        />
    ));
