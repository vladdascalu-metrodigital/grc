import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberInput from '../NumberInput';

storiesOf('Forms/NumberInput', module).add('number input', () => (
    <div style={{ display: 'grid', gridGap: '1rem' }}>
        <NumberInput />
    </div>
));
