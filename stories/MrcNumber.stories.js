import React from 'react';
import { storiesOf } from '@storybook/react';
import MrcNumber, { COUNTRY } from '../MrcNumber';

storiesOf('Fundamentals/MrcNumber', module).add('numbers and currencies', () => (
    <div style={{ display: 'grid', gridGap: '1rem' }}>
        <MrcNumber>100.123</MrcNumber>
        <MrcNumber isCurrency>100.123</MrcNumber>
        <MrcNumber isCurrency country={COUNTRY.PL}>
            100.123
        </MrcNumber>
    </div>
));
