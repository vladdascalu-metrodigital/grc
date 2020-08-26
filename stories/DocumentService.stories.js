import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import DocumentService from '../new-ui-topics/DocumentService';

import { attachments } from './fixtures/attachments';

storiesOf('New UI Topics/DocumentService', module).add('DocumentService', () => (
    <MainContent>
        <DocumentService
            data={[
                {
                    title: 'January 2020',
                    attachments,
                },
                {
                    title: 'February 2020',
                    attachments,
                },
            ]}
        />
    </MainContent>
));
