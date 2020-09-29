import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from '../MrcTable';

storiesOf('Layouts/Tables/MrcTable', module)
    .add('Sticky Usage', () => (
        <Table.Root>
            <Table.Head>
                <Table.R sticky="sticky-group-id">
                    <Table.H>a</Table.H>
                    <Table.H>b</Table.H>
                    <Table.H>c</Table.H>
                </Table.R>
                <Table.R sticky="sticky-group-id">
                    <Table.H>
                        a<br />a
                    </Table.H>
                    <Table.H>b</Table.H>
                    <Table.H>c</Table.H>
                </Table.R>
                <Table.R sticky="sticky-group-id">
                    <Table.H>a</Table.H>
                    <Table.H>b</Table.H>
                    <Table.H>c</Table.H>
                </Table.R>
            </Table.Head>
            <Table.Body>
                <Table.R key={'first'}>
                    <Table.D>1 first row</Table.D>
                    <Table.D>2 first row</Table.D>
                    <Table.D>3 first row</Table.D>
                </Table.R>
                {[...Array(50).keys()].map((e, i) => (
                    <Table.R key={i}>
                        <Table.D>1</Table.D>
                        <Table.D>2</Table.D>
                        <Table.D>3</Table.D>
                    </Table.R>
                ))}
            </Table.Body>
        </Table.Root>
    ))
    .add('Fixed/Auto Table Layout', () => (
        <React.Fragment>
            <h2 className="my-5">Auto Layout (Default)</h2>
            <Table.Root>
                <Table.Head>
                    <Table.R>
                        <Table.H>aaaaa</Table.H>
                        <Table.H>bbbbbbbbbbbbbbbbbb</Table.H>
                        <Table.H>cccccc</Table.H>
                    </Table.R>
                </Table.Head>
                <Table.Body>
                    <Table.R key={'first'}>
                        <Table.D>1</Table.D>
                        <Table.D>2</Table.D>
                        <Table.D>3</Table.D>
                    </Table.R>
                </Table.Body>
            </Table.Root>
            <h2 className="my-5">Fixed Layout</h2>
            <Table.Root fixedLayout>
                <Table.Head>
                    <Table.R>
                        <Table.H>aaaaa</Table.H>
                        <Table.H>bbbbbbbbbbbbbbbbbb</Table.H>
                        <Table.H>cccccc</Table.H>
                    </Table.R>
                </Table.Head>
                <Table.Body>
                    <Table.R key={'first'}>
                        <Table.D>1</Table.D>
                        <Table.D>2</Table.D>
                        <Table.D>3</Table.D>
                    </Table.R>
                </Table.Body>
            </Table.Root>
        </React.Fragment>
    ));
