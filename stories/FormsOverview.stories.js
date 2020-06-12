import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import MainContent from '../MainContent';
import NumberInput from '../NumberInput';
import Select from '../Select';
import Grid from '../Grid';

let options = [
    ['0', 'Option 0'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
];

storiesOf('Forms/Overview', module).add('An example form', () => {
    let [selected, setSelected] = useState('2');
    return (
        <MainContent>
            <Grid cols={3}>
                <div>
                    <NumberInput />
                </div>
                <div>
                    <Select options={options} value={selected} onChange={v => setSelected(v)} />
                </div>
            </Grid>
        </MainContent>
    );
});
