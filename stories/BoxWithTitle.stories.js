import React from 'react';
import { storiesOf } from '@storybook/react';
import BoxWithTitle, { TYPE } from '../BoxWithTitle';
import Grid from '../Grid';
import Card from '../Card';

storiesOf('Fundamentals/BoxWithTitle', module)
    .add('boxes with title, smaller variant', () => (
        <Grid>
            <BoxWithTitle title="Business Info" type={TYPE.SMALLER}>
                Duis sunt amet adipisicing voluptate tempor est do tempor.
            </BoxWithTitle>
            <BoxWithTitle title="Contact Info" type={TYPE.SMALLER}>
                <Card>
                    Veniam adipisicing eiusmod aliquip dolore sint cupidatat ea in nulla. Aliquip minim aliquip
                    consequat ea deserunt enim consequat minim in. Proident ex officia cupidatat cupidatat consectetur
                    eu commodo incididunt elit cupidatat sit adipisicing ut sunt. Consequat officia dolor quis aute ut
                    voluptate aute duis exercitation.
                </Card>
            </BoxWithTitle>
            <BoxWithTitle title="With Action" type={TYPE.SMALLER} action={{ title: 'edit', fn: () => alert('yo.') }}>
                Laborum eiusmod fugiat ullamco ullamco elit occaecat mollit non sunt. Reprehenderit veniam incididunt ea
                nisi cillum aliquip anim qui pariatur ea.
            </BoxWithTitle>
        </Grid>
    ))
    .add('box with title default', () => (
        <BoxWithTitle title="Groupdetails" action={{ title: 'edit', fn: () => alert('yo.') }}>
            Elit minim pariatur nostrud pariatur est incididunt est culpa cillum elit. Dolor nulla ex fugiat dolor. Anim
            cillum reprehenderit laborum exercitation commodo irure nulla. Irure ea nulla amet laboris minim irure id
            adipisicing. Ea aute amet voluptate ex non. Culpa amet enim dolor id deserunt elit irure nostrud do nisi
            labore magna culpa.
        </BoxWithTitle>
    ))
    .add('no padding for content area', () => (
        <BoxWithTitle flush title="No padding for content">
            <Card isBlock>I will provide my own spacing</Card>
        </BoxWithTitle>
    ));
