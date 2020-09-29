import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import EmailService from '../new-ui-topics/EmailService';
import AppShell from '../AppShell';
// import { attachments } from './fixtures/attachments';

import MainMenu from '../MainMenu';
import LanguageList from '../LanguageList';

import quickNavConfig from './fixtures/config/quickNav';
import languageConfig from './fixtures/config/languages';

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

storiesOf('New UI Topics/EmailService', module).add('EmailService', () => (
    <AppShell
        title="E-Mail Service"
        customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
        customerId="15/116102"
        customerStatus=""
        MainMenuComponent={MockedMainMenu}
        LanguageListComponent={MockedLanguageList}
    >
        <EmailService
            data={[
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    dunningEmail: 'contact@mueller.gmbh',
                    dunningEmailStatus: 'pending',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    dunningEmail: 'info@betterlife.gmbh',
                    dunningEmailStatus: 'approved',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    dunningEmail: 'info@maier.ag',
                    dunningEmailStatus: 'Domain verified',
                },
            ]}
        />
    </AppShell>
));
