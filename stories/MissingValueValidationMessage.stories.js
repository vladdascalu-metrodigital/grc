import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid, { GAP, GridItem } from '../Grid';
import Card, { TYPE } from '../Card';
import MissingValueValidationMessage from '../MissingValueValidationMessage';

storiesOf('Fundamentals/MissingValueValidationMessage', module).add('MissingValueValidationMessage', () => (
    <MissingValueValidationMessage message="Value is missing"></MissingValueValidationMessage>
));
