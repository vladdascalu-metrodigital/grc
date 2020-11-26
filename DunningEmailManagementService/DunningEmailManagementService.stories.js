import React from 'react';
import { storiesOf } from '@storybook/react';
import AppShell from '../AppShell';

import MainMenu from '../MainMenu';
import LanguageList from '../LanguageList';

import quickNavConfig from '../fixtures/config/quickNav';
import languageConfig from '../fixtures/config/languages';
import DunningEmailManagementLayout from './DunningEmailManagement/DunningEmailManagementLayout';

storiesOf('Services/DunningEmailManagement', module)
    .add('Active Customers Group', () => (
        <AppShell
            title="Dunning Email Management"
            customerName="Betterlife GmbH Super"
            customerId="15/1222"
            customerStatus=""
            MainMenuComponent={MockedMainMenu}
            LanguageListComponent={MockedLanguageList}
            config={config}
        >
            <DunningEmailManagementLayout
                currentUiPageTitleEvent={(value) => console.log(value)}
                updateUiPageTitle={(value) => console.log(value)}
                config={config}
                data={{
                    data: {
                        size: 4,
                        query: null,
                        customerBasicInfo: {
                            customerId: {
                                country: 'de',
                                storeNumber: '15',
                                customerNumber: '1222',
                            },
                            customerFullName: 'test gmbh',
                            companyOwnerFullName: 'test owner',
                        },
                        customers: [
                            {
                                accountId: 't1',
                                country: 'de',
                                customerId: {
                                    country: 'de',
                                    storeNumber: '15',
                                    customerNumber: '1222',
                                },
                                customerFullName: 'test gmbh',
                                companyOwnerFullName: 'test owner',
                                dunningEmail: 'dunning1@t.com',
                                customerEmails: ['dunning1@t.com', 't1@t.com', 't2@t.com'],
                                emailVerificationStatus: 'SYNTAX_VERIFIED',
                            },
                            {
                                accountId: 't2',
                                country: 'de',
                                customerId: {
                                    country: 'de',
                                    storeNumber: '15',
                                    customerNumber: '100001',
                                },
                                customerFullName: 'test gmbh',
                                companyOwnerFullName: 'test owner2',
                                dunningEmail: 'test2@t.com',
                                customerEmails: ['test2@t.com'],
                                emailVerificationStatus: 'UNVERIFIED',
                            },
                            {
                                accountId: 't3',
                                country: 'de',
                                customerId: {
                                    country: 'de',
                                    storeNumber: '15',
                                    customerNumber: '100002',
                                },
                                customerFullName: 'test gmbh',
                                companyOwnerFullName: 'test owner',
                                dunningEmail: '',
                                customerEmails: [''],
                                emailVerificationStatus: null,
                            },
                            {
                                accountId: 't4',
                                country: 'de',
                                customerId: {
                                    country: 'de',
                                    storeNumber: '15',
                                    customerNumber: '100003',
                                },
                                customerFullName: 'ssss gmbh',
                                companyOwnerFullName: 'test owner',
                                dunningEmail: 'test1@t.com',
                                customerEmails: ['test1@t.com', 'test232@t.com', 'test234@t.com', 'test235@t.com'],
                                emailVerificationStatus: 'UNVERIFIED',
                            },
                        ],
                    },
                }}
            />
        </AppShell>
    ))
    .add('Single Customer', () => (
        <AppShell
            title="Dunning Email Management"
            customerName="Betterlife2 GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
            customerId="15/1222"
            customerStatus=""
            MainMenuComponent={MockedMainMenu}
            LanguageListComponent={MockedLanguageList}
            config={config}
        >
            <DunningEmailManagementLayout
                currentUiPageTitleEvent={(value) => console.log(value)}
                updateUiPageTitle={(value) => console.log(value)}
                config={config}
                data={{
                    data: {
                        size: 1,
                        query: null,
                        customerBasicInfo: {
                            customerId: {
                                country: 'de',
                                storeNumber: '15',
                                customerNumber: '1222',
                            },
                            customerFullName: 'test gmbh',
                            companyOwnerFullName: 'test owner',
                        },
                        customers: [
                            {
                                accountId: 'test1',
                                country: 'de',
                                customerId: {
                                    country: 'de',
                                    storeNumber: '15',
                                    customerNumber: '1222',
                                },
                                customerFullName: 'test gmbh',
                                companyOwnerFullName: 'test owner',
                                dunningEmail: 'dunning1@t.com',
                                customerEmails: ['dunning1@t.com', 't1@t.com', 't2@t.com'],
                                emailVerificationStatus: 'UNVERIFIED',
                            },
                        ],
                    },
                }}
            />
        </AppShell>
    ))
    .add('Inactive Customers Group', () => (
        <AppShell
            title="Dunning Email Management"
            customerName="Betterlife2 GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
            customerId="15/1222"
            customerStatus=""
            MainMenuComponent={MockedMainMenu}
            LanguageListComponent={MockedLanguageList}
            config={config}
        >
            <DunningEmailManagementLayout
                currentUiPageTitleEvent={(value) => console.log(value)}
                updateUiPageTitle={(value) => console.log(value)}
                config={config}
                data={{
                    data: {
                        size: 0,
                        customerId: {
                            country: 'de',
                            storeNumber: '15',
                            customerNumber: '1223',
                        },
                        customerAccounts: [],
                        dunningEmailChanges: {},
                    },
                }}
            />
        </AppShell>
    ));

const config = {
    data: {
        ...languageConfig.data,
        ...quickNavConfig.data,
    },
};

const MockedMainMenu = (props) => (
    <MainMenu
        {...props}
        config={quickNavConfig}
        activeItem="dunningemailmanagement"
        updateActiveItem={(item) => action('updateActiveItem')(item)}
    />
);

const MockedLanguageList = (props) => (
    <LanguageList {...props} config={languageConfig} languageChange={(l) => action('languageChange')(l)} />
);
