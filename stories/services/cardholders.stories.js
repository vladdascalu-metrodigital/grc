import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContent from '../../MainContent';
import CardHolders from '../../new-ui-topics/CardHolders_WIP';
import CardHoldersSearchHistory from '../../new-ui-topics/CardHolders_WIP/CardHoldersSearchHistory.js';
import CardHoldersSearchResult from '../../new-ui-topics/CardHolders_WIP/CardHoldersSearchResult.js';
import CardHoldersCustomerGroup from '../../new-ui-topics/CardHolders_WIP/CardHoldersCustomerGroup';

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
