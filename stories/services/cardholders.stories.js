import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContent from '../../MainContent';
import CardHolders from '../../service-components/CardHolders_WIP';
import CardHoldersSearchHistory from '../../service-components/CardHolders_WIP/CardHoldersSearchHistory.js';
import CardHoldersSearchResult from '../../service-components/CardHolders_WIP/CardHoldersSearchResult.js';
import CardHoldersCustomerGroup from '../../service-components/CardHolders_WIP/CardHoldersCustomerGroup';

storiesOf('New UI Topics/Card Holders WIP', module)
    .add('Card Holders', () => (
        <MainContent>
            <CardHolders />
        </MainContent>
    ))
    .add('Search History', () => (
        <MainContent>
            <CardHoldersSearchHistory />
        </MainContent>
    ))
    .add('Search Result', () => (
        <MainContent>
            <CardHoldersSearchResult />
        </MainContent>
    ))
    .add('Customer Group', () => (
        <MainContent>
            <CardHoldersCustomerGroup />
        </MainContent>
    ));
