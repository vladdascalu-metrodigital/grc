import React from 'react';
import { storiesOf } from '@storybook/react';
import MainContent, { MODE as BM } from '../MainContent';
import Card from '../Card';

storiesOf('Layouts/MainContent', module).add('main content wrapper', () => (
    <MainContent>
        <Card isBlock>This Card is wrapped by the MainContent component.</Card>
    </MainContent>
));
