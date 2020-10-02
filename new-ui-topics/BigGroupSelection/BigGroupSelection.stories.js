import React from 'react';
import { storiesOf } from '@storybook/react';
import BigGroupSelection from '.';
import AppShell from '../../AppShell';

import MainMenu from '../../MainMenu';
import LanguageList from '../../LanguageList';

import quickNavConfig from '../../fixtures/config/quickNav';
import languageConfig from '../../fixtures/config/languages';

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

storiesOf('New UI Topics/BigGroupSelection', module).add('BigGroupSelection', () => (
    <AppShell
        title="Big Group Selection"
        customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
        customerId="15/116102"
        customerStatus=""
        MainMenuComponent={MockedMainMenu}
        LanguageListComponent={MockedLanguageList}
        config={config}
    >
        <BigGroupSelection
            data={[
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Credit',
                    limit: '10000',
                },
                {
                    customer: 'Betterlife GmbH',
                    customerId: ' 133/343456',
                    paymentMethod: 'Credit',
                    limit: '20000',
                },
                {
                    customer: 'Maier Ag',
                    customerId: '123/99484',
                    paymentMethod: 'Credit',
                    limit: '5000',
                },
                {
                    customer: 'Müller GmbH',
                    customerId: '9949/343456',
                    paymentMethod: 'Prepayment',
                    limit: '4000',
                },
            ]}
        />
    </AppShell>
));
