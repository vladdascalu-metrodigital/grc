import React from 'react';
import { storiesOf } from '@storybook/react';
import CreditTab from '../../new-ui-topics/CreditTab';

storiesOf('S Credit Limit/Credit Tab', module).add('Credit Tab', () => <CreditTab />);

storiesOf('Services/Credit Tab', module)
    .add('Standard', () => (
        <CreditTab
            parent={'creditlimit'}
            country={'DE'}
            groupLimit={{ exhausted: 35000, current: 36000, wish: 90000, new: 60000 }}
            customer={{ name: 'Customer A', email: 'test@gmail.com', phone: '1239843' }}
            customers={[
                {
                    onAmountChange: () => null,
                    name: 'has credit, request credit, approved credit',
                    storeNumber: 10,
                    number: 99,
                    limit: {
                        current: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 1000, date: '4/2/2020' },
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: null, date: null },
                        },
                        new: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    isBlocked: true,
                    name: 'has credit, request credit, approved credit (blocked)',
                    storeNumber: 10,
                    number: 98,
                    limit: {
                        current: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 1000, date: '4/2/2020' },
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 1000, date: '4/2/2020' },
                        },

                        new: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'has credit, request credit, no approved',
                    storeNumber: 10,
                    number: 97,
                    limit: {
                        current: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                        new: null,
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'has credit, requests cash, no approved',
                    storeNumber: 10,
                    number: 95,
                    limit: {
                        current: {
                            amount: 30000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 0, date: null },
                        },
                        wish: { amount: 0, product: null, period: null, debitType: null },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'has credit(empty), request credit, approved credit',
                    storeNumber: 10,
                    number: 96,
                    limit: {
                        current: { amount: undefined, product: null, period: null, debitType: null },
                        wish: {
                            amount: 30000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 0, date: null },
                        },
                        new: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 0, date: '4/2/2020' },
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'has cash, requests credit, no approved',
                    storeNumber: 10,
                    number: 95,
                    limit: {
                        current: {
                            amount: 0,
                            product: null,
                            period: null,
                            debitType: null,
                            expiry: null,
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 0, date: null },
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'has cash, requests cash, no approved',
                    storeNumber: 10,
                    number: 95,
                    limit: {
                        current: {
                            amount: 0,
                            product: null,
                            period: null,
                            debitType: null,
                            expiry: null,
                        },
                        wish: {
                            amount: 0,
                            product: null,
                            period: null,
                            debitType: null,
                            expiry: { amount: 0, date: null },
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'has cash, requests cash, credit approved',
                    storeNumber: 10,
                    number: 95,
                    limit: {
                        current: {
                            amount: 0,
                            product: null,
                            period: null,
                            debitType: null,
                            expiry: null,
                        },
                        wish: {
                            amount: 0,
                            product: null,
                            period: null,
                            debitType: null,
                            expiry: { amount: 0, date: null },
                        },
                        new: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                    },
                },
            ]}
        />
    ))
    .add('History', () => (
        <CreditTab
            parent={'history'}
            country={'DE'}
            groupLimit={{ exhausted: null, old: 36000, wish: 90000, current: 60000 }}
            customers={[
                {
                    onAmountChange: () => null,
                    name: 'type A (standard)',
                    storeNumber: 10,
                    number: 99,
                    limit: {
                        old: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: null, date: null },
                        },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    isBlocked: true,
                    name: 'type A (blocked)',
                    storeNumber: 10,
                    number: 98,
                    limit: {
                        old: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 2000, date: '4/2/2020' },
                        },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'type B (standard)',
                    storeNumber: 10,
                    number: 97,
                    limit: {
                        old: {
                            amount: 12000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                        wish: {
                            amount: 30000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'type D (current: cash)',
                    storeNumber: 10,
                    number: 96,
                    limit: {
                        old: { amount: 0, product: null, period: null, debitType: null },
                        wish: {
                            amount: 30000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 0, date: '4/2/2020' },
                        },
                    },
                },
                {
                    onAmountChange: () => null,
                    name: 'type D (no current limit)',
                    storeNumber: 10,
                    number: 96,
                    limit: {
                        old: { amount: undefined, product: null, period: null, debitType: null },
                        wish: {
                            amount: 30000,
                            product: 'Metro Cash',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                        },
                        current: {
                            amount: 20000,
                            product: 'Metro Top',
                            period: '12',
                            debitType: 'Basislastschriftmandat',
                            expiry: { amount: 0, date: '4/2/2020' },
                        },
                    },
                },
            ]}
        />
    ));
