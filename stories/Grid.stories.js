import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';
import Card, { TYPE } from '../Card';

storiesOf('Layouts/Grid', module).add('super automatic grid', () => (
    <Grid>
        <Card>very</Card>
        <Card type={TYPE.WARNING}>automatic</Card>
        <Card>layout</Card>
        <Card>of</Card>
        <Card>things</Card>
    </Grid>
));
