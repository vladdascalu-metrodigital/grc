import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PageHeader from '../PageHeader';
import PageTitle from '../PageTitle';

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
            />
        );
    })
    .add('PageTitle only with title', () => {
        return <PageTitle title="Credit Correction" />;
    });
