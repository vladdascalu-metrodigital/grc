import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import EmailService from '../new-ui-topics/EmailService';

// import { attachments } from './fixtures/attachments';

storiesOf('New UI Topics/EmailService', module).add('EmailService', () => (
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
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
                dunningEmailStatus: 'domainverified',
            },
        ]}
    />
));
