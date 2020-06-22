import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberInput from '../NumberInput';
import MainContent from '../MainContent';

storiesOf('Forms/NumberInput', module).add('number input', () => (
    <MainContent>
        <NumberInput />
    </MainContent>
));
