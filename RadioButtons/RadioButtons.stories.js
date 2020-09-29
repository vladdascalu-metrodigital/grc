import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MainContent from '../MainContent';
import RadioButtons from '../RadioButtons';

let options = [
    ['0', 'Option 0'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
];

storiesOf('Forms/RadioButtons', module)
    .add('RadioButtons', () => {
        let [selected, setSelected] = useState('2');
        const handleChange = (value) => {
            action('clicked')(value);
            setSelected(value);
        };
        return (
            <MainContent>
                <RadioButtons options={options} value={selected} onChange={handleChange} />
            </MainContent>
        );
    })
    .add('Disabled RadioButtons', () => {
        return (
            <MainContent>
                <RadioButtons options={options} disabled />
            </MainContent>
        );
    });
