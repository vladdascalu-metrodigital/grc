import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AppShell from '../new-ui-topics/AppShell';

storiesOf('New UI Topics/AppShell', module).add('AppShell', () => {
    return (
        <AppShell
            title="Credit Correction"
            customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
            customerId="15/116102"
            customerStatus="Kassensperre"
        >
            <p>Content</p>
        </AppShell>
    );
});
