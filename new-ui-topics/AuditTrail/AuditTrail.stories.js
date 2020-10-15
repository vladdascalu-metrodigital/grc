import React from 'react';
import { storiesOf } from '@storybook/react';
import AuditTrail from '.';
import AppShell from '../../AppShell';

import MainMenu from '../../MainMenu';
import LanguageList from '../../LanguageList';

import quickNavConfig from '../../fixtures/config/quickNav';
import languageConfig from '../../fixtures/config/languages';

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
        activeItem="history"
        updateActiveItem={(item) => action('updateActiveItem')(item)}
    />
);

const MockedLanguageList = (props) => (
    <LanguageList {...props} config={languageConfig} languageChange={(l) => action('languageChange')(l)} />
);

storiesOf('New UI Topics/AuditTrail', module).add('AuditTrail', () => (
    <AppShell
        title="Limit Check"
        customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
        customerId="15/116102"
        customerStatus=""
        config={config}
        headerInfoData={{}}
        MainMenuComponent={MockedMainMenu}
        LanguageListComponent={MockedLanguageList}
        tabs={tabs}
        activeTabId={tabs[8].id}
    >
        <AuditTrail
            section={['Activation', 'Approval', 'Initialisation']}
            colleaguesWithRoles={{ cc: ['hugo.peter@metronom.com', 'max.mustermann@metro.com'] }}
            activationResults={[
                ['15', '97', '0', 'Activation Succeded'],
                ['11', '56', '0', 'Activation Succeded'],
                ['23', '97', '2', 'Activation Succeded'],
            ]}
            trail={{
                Activation: [
                    {
                        user: '',
                        role: 'MCR System',
                        roleId: 'mrc-system',
                        status: 'pending',
                        timestamp: '',
                    },
                ],
                Approval: [
                    {
                        user: '',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'pending',
                        timestamp: '',
                    },
                    {
                        user: '',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'pending',
                        timestamp: '',
                    },
                    {
                        user: '',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'pending',
                        timestamp: '',
                    },
                    {
                        user: 'hugo.peter@metronom.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '23.09.2020 13:45 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                ],
                Initialisation: [
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                ],
            }}
        />
    </AppShell>
));

storiesOf('New UI Topics/AuditTrail', module).add('AuditTrail History', () => (
    <AppShell
        title="Limit Check"
        customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
        customerId="15/116102"
        customerStatus=""
        config={config}
        headerInfoData={{}}
        MainMenuComponent={MockedMainMenu}
        LanguageListComponent={MockedLanguageList}
        tabs={tabs}
        activeTabId={tabs[8].id}
    >
        <AuditTrail
            colleaguesWithRoles={{ cc: ['hugo.peter@metronom.com', 'max.mustermann@metro.com'] }}
            activationResults={[
                {
                    store: '15',
                    customer: '97',
                    result: '0',
                    message: 'Activation Succeded',
                },
                {
                    store: '11',
                    customer: '56',
                    result: '0',
                    message: 'Activation Succeded',
                },
                {
                    store: '23',
                    customer: '97',
                    result: '2',
                    message:
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                },
            ]}
            section={['Activation', 'Approval', 'Initialisation']}
            trail={{
                Activation: [
                    {
                        user: '',
                        role: 'MCR System',
                        roleId: 'mrc-system',
                        status: 'approved',
                        timestamp: '23.09.2020 14:50 Uhr',
                    },
                ],
                Approval: [
                    {
                        user: 'hugo.peter@metronom.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '23.09.2020 13:51 Uhr',
                    },
                    {
                        user: 'hugo.peter@metronom.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '23.09.2020 13:50 Uhr',
                    },
                    {
                        user: 'hugo.peter@metronom.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '23.09.2020 13:48 Uhr',
                    },
                    {
                        user: 'hugo.peter@metronom.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '23.09.2020 13:45 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'rejected',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                ],
                Initialisation: [
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                    {
                        user: 'max.mustermann@metro.com',
                        role: 'Customer Consultant (CC)',
                        roleId: 'cc',
                        status: 'approved',
                        timestamp: '22.09.2020 16:55 Uhr',
                    },
                ],
            }}
        />
    </AppShell>
));
