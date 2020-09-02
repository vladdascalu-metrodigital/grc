import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid, { GAP, GridItem } from '../Grid';
import Card, { TYPE } from '../Card';
import MissingValueValidationMessage from '../MissingValueValidationMessage';
import { lookup } from '../Util/translations';

storiesOf('Fundamentals/MissingValueValidationMessage', module).add('MissingValueValidationMessage', () => (
    <MissingValueValidationMessage message={lookup('mrc.credittab.missingvalue')} />
));
