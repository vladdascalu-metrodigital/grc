import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import '../Util/imports';

import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../ErrorHandledTabPanel';

// A helper component to throw exceptions
const Boom = () => {
    throw new Error('This is a demo Exception');
};

storiesOf('Error Handling', module).add('ErrorHandledTabPanel', () => (
    <Tabs>
        <TabList>
            <Tab>Error</Tab>
            <Tab>No Error</Tab>
        </TabList>
        <ErrorHandledTabPanel>
            <Boom />
        </ErrorHandledTabPanel>
        <ErrorHandledTabPanel>Hi! 👋</ErrorHandledTabPanel>
    </Tabs>
));
