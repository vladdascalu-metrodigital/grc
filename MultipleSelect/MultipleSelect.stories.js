import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MultipleSelect from '../MultipleSelect';
import MainContent from '../MainContent';

let options = [
    ['0', 'Option 0'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
    ['5', 'Option 5'],
    ['6', 'Option 6'],
    ['7', 'Option 7'],
    ['8', 'Option 8'],
];

storiesOf('Forms/MultipleSelect', module)
    .add('Multi Select', () => {
        let [selected, setSelected] = useState('2');
        let changeHandler = (v) => {
            action('on change')(v);
            setSelected(v);
        };
        return (
            <MainContent>
                <MultipleSelect
                    label="Multi Select"
                    options={options}
                    onChange={(v) => changeHandler(v)}
                    onBlur={() => action('blur')('blur')}
                    value={selected}
                />
            </MainContent>
        );
    })
    .add('Delayed Change', () => {
        let [selected, setSelected] = useState('2');
        let changeHandler = (v) => {
            action('on change')(v);
            setSelected(v);
        };
        return (
            <MainContent>
                <MultipleSelect
                    label="Multi Select"
                    options={options}
                    onChange={(v) => changeHandler(v)}
                    onChangeDelayed={(v) => action('on change delayed')(v)}
                    changeDelay={1000}
                    onBlur={() => action('blur')('blur')}
                    value={selected}
                />
            </MainContent>
        );
    })
    .add('Invalid by Prop', () => {
        let [selected, setSelected] = useState('2');
        let changeHandler = (v) => {
            action('on change')(v);
            setSelected(v);
        };
        return (
            <MainContent>
                <MultipleSelect
                    status="invalid"
                    validationMessages={['mrc.a.custom_translation_key']}
                    label="Multi Select"
                    options={options}
                    onChange={(v) => changeHandler(v)}
                    onBlur={() => action('blur')('blur')}
                    value={selected}
                />
            </MainContent>
        );
    })
    .add('Required Multi Select', () => {
        let [selected, setSelected] = useState(null);
        let changeHandler = (v) => {
            action('on change')(v);
            setSelected(v);
        };
        return (
            <MainContent>
                <MultipleSelect
                    required
                    label="Multi Select"
                    options={options}
                    onChange={(v) => changeHandler(v)}
                    onBlur={() => action('blur')('blur')}
                    value={selected}
                />
            </MainContent>
        );
    });
