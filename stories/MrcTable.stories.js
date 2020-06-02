import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from '../MrcTable';

storiesOf('layouts/Tables/MrcTable', module).add('sticky usage', () => (
    <Table.Root>
        <Table.Head>
            <Table.R isSticky>
                <Table.H>a</Table.H>
                <Table.H>b</Table.H>
                <Table.H>c</Table.H>
            </Table.R>
            <Table.R isSticky>
                <Table.H>
                    a<br />a
                </Table.H>
                <Table.H>b</Table.H>
                <Table.H>c</Table.H>
            </Table.R>
            <Table.R isSticky>
                <Table.H>a</Table.H>
                <Table.H>b</Table.H>
                <Table.H>c</Table.H>
            </Table.R>
        </Table.Head>
        <Table.Body>
            {[...Array(50).keys()].map((e, i) => (
                <Table.R key={i}>
                    <Table.D>1</Table.D>
                    <Table.D>2</Table.D>
                    <Table.D>3</Table.D>
                </Table.R>
            ))}
        </Table.Body>
    </Table.Root>
));
