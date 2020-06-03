import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';
import Card, { TYPE } from '../Card';

storiesOf('Layouts/Grid', module)
    .add('super automatic grid', () => (
        <Grid>
            <Card>very</Card>
            <Card type={TYPE.WARNING}>automatic</Card>
            <Card>layout</Card>
            <Card>of</Card>
            <Card>things</Card>
        </Grid>
    ))
    .add('define columns', () => (
        <Grid cols="4">
            <Card>1</Card>
            <Card>2</Card>
            <Card>3</Card>
            <Card>4</Card>
            <Card>1</Card>
            <Card>2</Card>
            <Card>3</Card>
            <Card>4</Card>
        </Grid>
    ));
