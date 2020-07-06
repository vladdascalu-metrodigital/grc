import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';
import MrcDate from '../MrcDate';

storiesOf('Fundamentals/MrcDate', module).add('display a local date', () => (
    <Grid>
        <MrcDate type="smaller">4/1/2020</MrcDate>
        <MrcDate type="small">4/2/2020</MrcDate>
        <MrcDate>4/3/2020</MrcDate>
    </Grid>
));
