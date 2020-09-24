import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppShell from '../AppShell';
import MainMenu from '../MainMenu';
import LanguageList from '../LanguageList';

import quickNavConfig from './fixtures/config/quickNav';
import languageConfig from './fixtures/config/languages';

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

const MockedNotification = () => (
    <div style={{ background: 'red', color: 'white', padding: '.5rem' }}>Notification Dummy</div>
);

storiesOf('AppShell', module)
    .add('AppShell including MainMenu', () => {
        return (
            <AppShell
                title="Credit Correction"
                customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
                customerId="15/116102"
                customerStatus="Kassensperre"
                MainMenuComponent={MockedMainMenu}
                LanguageListComponent={MockedLanguageList}
            >
                <p>Content</p>
            </AppShell>
        );
    })
    .add('AppShell with Notification', () => {
        return (
            <AppShell
                title="Credit Correction"
                customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
                customerId="15/116102"
                customerStatus="Kassensperre"
                MainMenuComponent={MockedMainMenu}
                LanguageListComponent={MockedLanguageList}
                NotificationComponent={MockedNotification}
            >
                <p>Content</p>
            </AppShell>
        );
    });
