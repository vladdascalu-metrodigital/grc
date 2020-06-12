import React from 'react';
import { storiesOf } from '@storybook/react';
import CreditTab from '../../service-components/CreditTab';

storiesOf('Services/Credit Tab', module)
    .add('Standard', () => (
        <CreditTab
            historical={false}
            country={'DE'}
            groupLimit={{ exhausted: null, old: 36000, wish: 90000, current: 60000 }}
            customer={{ name: 'Customer A', email: 'test@gmail.com', phone: '1239843' }}
            customers={[
                {
                    name: 'Customer A',
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
                    isBlocked: true,
                    name: 'Customer B',
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
                    name: 'Customer C',
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
                    name: 'Customer A',
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
                    name: 'Customer B',
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
                    name: 'Customer C',
                    storeNumber: 10,
                    number: 97,
                    limit: {
                        old: { amount: 12000, product: 'Metro Cash', period: '12', method: 'Basislastshriftmandat' },
                        wish: { amount: 30000, product: 'Metro Top', period: '12', method: 'Basislastshriftmandat' },
                    },
                },
            ]}
        />
    ));
