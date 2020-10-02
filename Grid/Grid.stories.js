import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid, { GAP, GridItem } from '../Grid';
import Card, { TYPE } from '../Card';

storiesOf('Fundamentals/Grid', module)
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
    .add('Set grid-gap', () => (
        <Grid cols="1">
            <h2>Default asymmetric</h2>
            <Grid>
                <Card>a</Card>
                <Card type={TYPE.WARNING}>default</Card>
                <Card>grip</Card>
                <Card>gap</Card>
                <Card>ok</Card>
            </Grid>
            <h2>Small gap, symmetric</h2>
            <Grid gap={GAP.SMALL}>
                <Card>a</Card>
                <Card type={TYPE.WARNING}>small</Card>
                <Card>grid</Card>
                <Card>gap</Card>
                <Card>ok</Card>
            </Grid>
        </Grid>
    ))
    .add('Define Static Columns', () => (
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
    ))
    .add('Grid Item: colSpan', () => (
        <Grid cols={4}>
            <Card>X</Card>
            <Card>X</Card>
            <Card>X</Card>
            <Card>X</Card>
            <GridItem colSpan="all">
                <Card isBlock>colSpan = all</Card>
            </GridItem>
            <Card>X</Card>
            <GridItem colSpan={2}>
                <Card isBlock>colSpan = 2</Card>
            </GridItem>
            <Card>X</Card>
            <Card>X</Card>
            <Card>X</Card>
        </Grid>
    ));
