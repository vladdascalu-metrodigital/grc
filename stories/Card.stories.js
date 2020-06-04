import React from 'react';
import { storiesOf } from '@storybook/react';
import Card, { TYPE } from '../Card';
import Grid from '../Grid';

storiesOf('Fundamentals/Card', module)
    .add('all card types, Grid context', () => (
        <Grid>
            <Card>default</Card>
            <Card type={TYPE.PRIMARY}>primary</Card>
            <Card type={TYPE.MUTED}>muted</Card>
            <Card type={TYPE.WARNING}>warning</Card>
            <Card dropShadow>default with shadow</Card>
        </Grid>
    ))
    .add('a card', () => <Card>In Lorem cillum reprehenderit id qui laborum ipsum tempor nostrud.</Card>);
