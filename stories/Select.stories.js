import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MainContent from '../MainContent';
import Select from '../Select';

let options = [
    ['NULL', 'Please Choose'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
];

storiesOf('Forms/Select', module)
    .add('Select', () => {
        let [selected, setSelected] = useState('2');
        return (
            <MainContent>
                <Select
                    label="Choose One"
                    options={options}
                    value={selected}
                    onChange={(v) => {
                        action('selection change')(v);
                        setSelected(v);
                    }}
                />
            </MainContent>
        );
    })
    .add('Select Invalid by Prop', () => {
        let [selected, setSelected] = useState('NULL');
        return (
            <MainContent>
                <Select
                    status="invalid"
                    validationMessages={['mrc.my.custom_message']}
                    options={options}
                    value={selected}
                    onChange={(v) => {
                        action('selection change')(v);
                        setSelected(v);
                    }}
                />
            </MainContent>
        );
    })
    .add('Required Select', () => {
        let [selected, setSelected] = useState('NULL');
        return (
            <MainContent>
                <Select
                    required
                    options={options}
                    value={selected}
                    nullValue="NULL"
                    onChange={(v) => {
                        action('selection change')(v);
                        setSelected(v);
                    }}
                />
            </MainContent>
        );
    })
    .add('Disabled Select', () => {
        let [selected, setSelected] = useState('2');
        return (
            <MainContent>
                <Select
                    disabled
                    options={options}
                    value={selected}
                    onChange={(v) => {
                        action('selection change')(v);
                        setSelected(v);
                    }}
                />
            </MainContent>
        );
    });
