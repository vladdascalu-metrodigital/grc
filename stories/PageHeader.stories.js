import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PageHeader from '../new-ui-topics/PageHeader';

storiesOf('New UI Topics/Header', module).add('PageHeader', () => {
    return (
        <PageHeader
            title="Credit Correction"
            customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
            customerId="15/116102"
            customerStatus="Kassensperre"
        />
    );
});
