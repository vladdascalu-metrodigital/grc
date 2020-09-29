import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';
import MrcCurrencySymbol, { COUNTRY, TYPE } from '../MrcCurrencySymbol';

storiesOf('Fundamentals/MrcCurrencySymbol', module).add('currency', () => (
    <Grid>
        <MrcCurrencySymbol country={COUNTRY.PL} />
        <MrcCurrencySymbol country={COUNTRY.AT} type={TYPE.SMALL} />
    </Grid>
));
