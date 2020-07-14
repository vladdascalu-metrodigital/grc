import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';
import Card, { TYPE } from '../Card';

storiesOf('Layouts/Grid', module)
    .add('Auto Layouts', () => (
        <Grid cols="1">
            <h2>Default minmax(22rem, 1fr)</h2>
            <Grid>
                <Card>very</Card>
                <Card type={TYPE.WARNING}>automatic</Card>
                <Card>layout</Card>
                <Card>of</Card>
                <Card>things</Card>
            </Grid>
            <h2>custom colMin 10rem minmax(10rem, 1fr)</h2>
            <Grid colMin="10rem">
                <Card>very</Card>
                <Card type={TYPE.WARNING}>automatic</Card>
                <Card>layout</Card>
                <Card>of</Card>
                <Card>things</Card>
            </Grid>
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
