import React from 'react';
import { storiesOf } from '@storybook/react';
import MrcNumber, { COUNTRY } from '../MrcNumber';
import Grid from '../Grid';

storiesOf('Fundamentals/MrcNumber', module).add('numbers and currencies', () => (
    <Grid>
        <MrcNumber type="small">100.123</MrcNumber>
        <MrcNumber type="smaller">100.123</MrcNumber>
        <MrcNumber>100.123</MrcNumber>
        <MrcNumber isCurrency>100.123</MrcNumber>
        <MrcNumber isCurrency country={COUNTRY.PL}>
            100.123
        </MrcNumber>
    </Grid>
));
