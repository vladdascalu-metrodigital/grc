import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import MainContent from '../MainContent';
import Select from '../Select';

let options = [
    ['0', 'Option 0'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
];

storiesOf('Forms/Select', module).add('select', () => {
    let [selected, setSelected] = useState('2');
    return (
        <MainContent>
            <Select options={options} value={selected} onChange={v => setSelected(v)} />
        </MainContent>
    );
});
