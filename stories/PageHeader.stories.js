import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainMenu from '../MainMenu';
import LanguageList from '../LanguageList';
import PageHeader from '../PageHeader';
import PageTitle from '../PageTitle';

import quickNavConfig from './fixtures/config/quickNav';
import languageConfig from './fixtures/config/languages';

let tabs = [
    {
        id: 'CustomerData',
        text: 'Customer Data',
        onClick: (a) => alert(a),
    },
    {
        id: 'CreditDetails',
        text: 'Credit Details',
        onClick: (a) => alert(a),
    },
    {
        id: 'Sales',
        text: 'Sales',
        onClick: (a) => alert(a),
    },
    {
        id: 'Scroring',
        text: 'Scroring',
        onClick: (a) => alert(a),
    },
    {
        id: 'SAPData',
        text: 'SAP Data',
        onClick: (a) => alert(a),
    },
    {
        id: 'Strategy',
        text: 'Strategy',
        onClick: (a) => alert(a),
    },
    {
        id: 'Comments',
        text: 'Comments',
        onClick: (a) => alert(a),
    },
    {
        id: 'Attachments',
        text: 'Attachments',
        onClick: (a) => alert(a),
    },
    {
        id: 'AuditTrail',
        text: 'Audit Trail',
        onClick: (a) => alert(a),
    },
];

const MockedMainMenu = (props) => (
    <MainMenu
        {...props}
        navConfig={quickNavConfig}
        activeItem="history"
        updateActiveItem={(item) => action('updateActiveItem')(item)}
    />
);

const MockedLanguageList = (props) => (
    <LanguageList {...props} config={languageConfig} languageChange={(l) => action('languageChange')(l)} />
);

storiesOf('PageHeader', module)
    .add('PageHeader with Tabs and Data', () => {
        return (
            <PageHeader
                title="Credit Correction"
                customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
                customerId="15/116102"
                customerStatus="Kassensperre"
                tabs={tabs}
                activeTabId={tabs[0].id}
                headerInfoData={{}}
                MainMenuComponent={MockedMainMenu}
                LanguageListComponent={MockedLanguageList}
            />
        );
    })
    .add('PageHeader without Tabs and Data', () => {
        return (
            <PageHeader
                title="Credit Correction"
                customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
                customerId="15/116102"
                customerStatus="Kassensperre"
                MainMenuComponent={MockedMainMenu}
                LanguageListComponent={MockedLanguageList}
            />
        );
    });

storiesOf('PageHeader', module)
    .add('PageTitle with customer', () => {
        return (
            <PageTitle
                title="Credit Correction"
                customerName="Betterlife GmbH"
                customerId="15/116102"
                customerStatus="Kassensperre"
                MainMenuComponent={MockedMainMenu}
                LanguageListComponent={MockedLanguageList}
            />
        );
    })
    .add('PageTitle only with title', () => {
        return (
            <PageTitle
                title="Credit Correction"
                MainMenuComponent={MockedMainMenu}
                LanguageListComponent={MockedLanguageList}
            />
        );
    });
