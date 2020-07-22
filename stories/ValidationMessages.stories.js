import React from 'react';
import { storiesOf } from '@storybook/react';
import ValidationMessages from '../InputValidationMessages';

storiesOf('Forms/ValidationMessages', module).add('Standalone ValidationMessages', () => (
    <ValidationMessages messages={['my.custom.messaage', 'more.custom.texts']} />
));
