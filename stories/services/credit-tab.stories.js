import React from 'react';
import { storiesOf } from '@storybook/react';
import CreditTab from '../../service-components/CreditTab';

storiesOf('Services/Credit Tab', module)
    .add('Standard', () => (
        <CreditTab
            historical={false}
            country={'DE'}
            groupLimit={{ exhausted: 35000, current: 36000, wish: 90000, new: 60000 }}
            customer={{ name: 'Customer A', email: 'test@gmail.com', phone: '1239843' }}
            customers={[
                {
                    type: 'credit',
                    name: 'type A',
                    storeNumber: 10,
                    number: 99,
                    limit: {
                        current: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 1000, date: '4/2/2020' },
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: null, date: null },
                        },

                        new: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                    },
                },
                {
                    type: 'credit',
                    isBlocked: true,
                    name: 'type A',
                    storeNumber: 10,
                    number: 98,
                    limit: {
                        current: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 1000, date: '4/2/2020' },
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 1000, date: '4/2/2020' },
                        },

                        new: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                    },
                },
                {
                    type: 'credit',
                    name: 'type B',
                    storeNumber: 10,
                    number: 97,
                    limit: {
                        current: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                        wish: { amount: 30000, product: 'Metro Top', period: '12', method: 'Basislastshriftmandat' },
                        new: null,
                    },
                },
                {
                    type: 'cash',
                    name: 'type D (no current limit)',
                    storeNumber: 10,
                    number: 96,
                    limit: {
                        current: { amount: undefined, product: null, period: null, method: null },
                        wish: {
                            amount: 30000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 0, date: null },
                        },
                        new: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 0, date: '4/2/2020' },
                        },
                    },
                },
            ]}
        />
    ))
    .add('History', () => (
        <CreditTab
            historical={true}
            country={'DE'}
            groupLimit={{ exhausted: null, old: 36000, wish: 90000, current: 60000 }}
            customer={{ name: 'Customer A', email: 'test@gmail.com', phone: '1239843' }}
            customers={[
                {
                    name: 'type A (standard)',
                    storeNumber: 10,
                    number: 99,
                    limit: {
                        old: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: null, date: null },
                        },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                    },
                },
                {
                    isBlocked: true,
                    name: 'type A (blocked)',
                    storeNumber: 10,
                    number: 98,
                    limit: {
                        old: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 2000, date: '4/2/2020' },
                        },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                        },
                    },
                },
                {
                    name: 'type B (standard)',
                    storeNumber: 10,
                    number: 97,
                    limit: {
                        old: { amount: 12000, product: 'Metro Cash', period: '12', method: 'Basislastshriftmandat' },
                        wish: { amount: 30000, product: 'Metro Top', period: '12', method: 'Basislastshriftmandat' },
                    },
                },
                {
                    name: 'type D (current: cash)',
                    storeNumber: 10,
                    number: 96,
                    limit: {
                        old: { amount: 0, product: null, period: null, method: null },
                        wish: { amount: 30000, product: 'Metro Cash', period: '12', method: 'Basislastshriftmandat' },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 0, date: '4/2/2020' },
                        },
                    },
                },
                {
                    name: 'type D (no current limit)',
                    storeNumber: 10,
                    number: 96,
                    limit: {
                        old: { amount: undefined, product: null, period: null, method: null },
                        wish: { amount: 30000, product: 'Metro Cash', period: '12', method: 'Basislastshriftmandat' },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            method: 'Basislastshriftmandat',
                            expiry: { amount: 0, date: '4/2/2020' },
                        },
                    },
                },
            ]}
        />
    ));
