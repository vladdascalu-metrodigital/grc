import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';
import MrcCurrency, { COUNTRY, TYPE } from '../MrcCurrency';

storiesOf('Fundamentals/MrcCurrency', module).add('currency', () => (
    <Grid>
        <MrcCurrency>100.123</MrcCurrency>
        <MrcCurrency type={TYPE.SMALLER}>100.123</MrcCurrency>
        <MrcCurrency type={TYPE.SMALL}>100.123</MrcCurrency>
        <MrcCurrency type={TYPE.LARGE}>100.123</MrcCurrency>
        <MrcCurrency type={TYPE.LARGE_BOLD}>100.123</MrcCurrency>
        <MrcCurrency country={COUNTRY.PL}>100.123</MrcCurrency>
    </Grid>
));
