import React from 'react';
import { storiesOf } from '@storybook/react';
import MissingValueValidationMessage from '../MissingValueValidationMessage';
import { lookup } from '../Util/translations';

storiesOf('Forms/MissingValueValidationMessage', module).add('MissingValueValidationMessage', () => (
    <MissingValueValidationMessage message={lookup('mrc.credittab.missingvalue')} />
));
