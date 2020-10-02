import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CustomerSearch from '../CustomerSearch';

storiesOf('Service Components/CustomerSearch', module)
    .add('standard search', () => (
        <CustomerSearch
            results={null}
            isLoading={false}
            doSearch={(value) => {
                action('doSearch')(value);
            }}
            updateSearchTerm={(value) => {
                action('updateSearchTerm')(value);
            }}
            updateUiPageTitle={(value) => {
                action('updateUiPageTitle')(value);
            }}
            showAuxControl={(value) => {
                action('showAuxControl')(value);
            }}
            hideNotification={(value) => {
                action('hideNotification')(value);
            }}
            searchTerm={null}
            cleanSearchResult={(value) => {
                action('cleanSearchResult')(value);
            }}
            match={{
                isExact: true,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ))
    .add('standard loading', () => (
        <CustomerSearch
            results={null}
            isLoading={true}
            doSearch={(value) => {
                action('doSearch')(value);
            }}
            updateSearchTerm={(value) => {
                action('updateSearchTerm')(value);
            }}
            updateUiPageTitle={(value) => {
                action('updateUiPageTitle')(value);
            }}
            showAuxControl={(value) => {
                action('showAuxControl')(value);
            }}
            hideNotification={(value) => {
                action('hideNotification')(value);
            }}
            searchTerm={'test1'}
            cleanSearchResult={(value) => {
                action('cleanSearchResult')(value);
            }}
            match={{
                isExact: false,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ))
    .add('standard found', () => (
        <CustomerSearch
            results={[
                {
                    customerId: {
                        country: 'DE',
                        customerNumber: '12',
                        storeNumber: '1',
                    },
                    vatSpecNumber: 't11',
                    names: {
                        customer: {
                            firstName: 'foo1',
                            lastName: 'bar1',
                        },
                        companyOwner: {
                            firstName: 'foo11',
                            lastName: 'bar11',
                        },
                    },
                },
                {
                    customerId: {
                        country: 'DE',
                        customerNumber: '13',
                        storeNumber: '1',
                    },
                    vatSpecNumber: 't12',
                    names: {
                        customer: {
                            firstName: 'foo2',
                            lastName: 'bar2',
                        },
                        companyOwner: {
                            firstName: 'foo22',
                            lastName: 'bar22',
                        },
                    },
                },
            ]}
            isLoading={false}
            doSearch={(value) => {
                action('doSearch')(value);
            }}
            updateSearchTerm={(value) => {
                action('updateSearchTerm')(value);
            }}
            updateUiPageTitle={(value) => {
                action('updateUiPageTitle')(value);
            }}
            showAuxControl={(value) => {
                action('showAuxControl')(value);
            }}
            hideNotification={(value) => {
                action('hideNotification')(value);
            }}
            searchTerm={'test1'}
            cleanSearchResult={(value) => {
                action('cleanSearchResult')(value);
            }}
            match={{
                isExact: false,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ))
    .add('standard not found', () => (
        <CustomerSearch
            results={[]}
            isLoading={false}
            doSearch={(value) => {
                action('doSearch')(value);
            }}
            updateSearchTerm={(value) => {
                action('updateSearchTerm')(value);
            }}
            updateUiPageTitle={(value) => {
                action('updateUiPageTitle')(value);
            }}
            showAuxControl={(value) => {
                action('showAuxControl')(value);
            }}
            hideNotification={(value) => {
                action('hideNotification')(value);
            }}
            searchTerm={'test1'}
            cleanSearchResult={(value) => {
                action('cleanSearchResult')(value);
            }}
            match={{
                isExact: true,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ));
