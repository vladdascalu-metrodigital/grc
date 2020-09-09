import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PageTitle from '../new-ui-topics/PageTitle';

storiesOf('New UI Topics/Header', module).add('PageTitle with customer', () => {
    return (
        <PageTitle
            title="Credit Correction"
            customerName="Betterlife GmbH"
            customerId="15/116102"
            customerStatus="Kassensperre"
        />
    );
});
