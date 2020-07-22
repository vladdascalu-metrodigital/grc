import React from 'react';
import { storiesOf } from '@storybook/react';

import { FlexRow, FlexColumn } from '../Flex';
import Card from '../Card';

storiesOf('Layouts/Flex', module)
    .add('Rows', () => (
        <FlexRow alignItems="center" gap="medium">
            <div>
                A simple
                <br />
                flex row component
            </div>
            <div>for flexing around</div>
        </FlexRow>
    ))
    .add('Columns', () => (
        <FlexColumn alignItems="center" gap="medium">
            <div>
                A simple
                <br />
                flex column component
            </div>
            <div>for flexing about</div>
        </FlexColumn>
    ))
    .add('Wrapping & Leading', () => (
        <FlexRow alignItems="center" gap="medium" leading="small" flexWrap="wrap">
            <Card>These</Card>
            <Card>Items</Card>
            <Card>Wrap</Card>
            <Card>When</Card>
            <Card>There</Card>
            <Card>Is</Card>
            <Card>No</Card>
            <Card>Space</Card>
            <Card>And</Card>
            <Card>Heave</Card>
            <Card>A</Card>
            <Card>
                <a href="https://en.wikipedia.org/wiki/Leading">Leading</a>
            </Card>
            <p>* Leading only works on Flex rows</p>
        </FlexRow>
    ));
