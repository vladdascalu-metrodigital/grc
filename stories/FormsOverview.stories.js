import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MainContent from '../MainContent';
import Grid from '../Grid';

import NumberInput from '../NumberInput';
import Select from '../Select';
import Search from '../Search';
import Toggle from '../Toggle';

let options = [
    ['0', 'Option 0'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
];

storiesOf('Forms/Overview', module).add('An example form', () => {
    let [selected, setSelected] = useState('2');
    let [toggleState, setToggle] = useState(false);
    return (
        <MainContent>
            <Grid cols={3}>
                <div>
                    <Search
                        placeholder="Search for Something"
                        onEnterSearch={v => action('search: onEnterSearch')(v)}
                        onChange={v => action('search: onChange')(v)}
                    />
                </div>
                <div>
                    <NumberInput />
                </div>
                <div>
                    <Select options={options} value={selected} onChange={v => setSelected(v)} />
                </div>
                <div>
                    <Toggle
                        checked={toggleState}
                        onClick={v => {
                            setToggle(v);
                            action('toggle: onClick')(v);
                        }}
                    >
                        Just a Toggle
                    </Toggle>
                </div>
            </Grid>
        </MainContent>
    );
});
