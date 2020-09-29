import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../Util/imports';

import ErrorHandler from '../ErrorHandler';

const Boom = () => {
    throw new Error('This is a demo Exception');
};

storiesOf('Error Handling', module).add('ErrorHandler', () => (
    <ErrorHandler>
        <Boom />
    </ErrorHandler>
));
