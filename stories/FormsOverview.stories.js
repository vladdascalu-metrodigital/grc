import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MainContent from '../MainContent';
import Grid from '../Grid';

import NumberInputNew from '../NumberInputNew';
import Select from '../Select';
import Search from '../Search';
import Toggle from '../Toggle';
import DatePicker from '../DatePicker';

import TextArea from '../TextArea';
import TextInput from '../TextInput';

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
    let [date, setDate] = useState(new Date());
    let [number, setNumber] = useState(50);
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
                <div>
                    <TextInput />
                </div>
                <div>
                    <TextArea />
                </div>
                <div>
                    <DatePicker selected={date} onChange={d => setDate(d)} />
                </div>
                <div>
                    <NumberInputNew label="Number" max={100} value={number} onChange={v => setNumber(v)} />
                </div>
                <div style={{ background: '#f9f9f9', padding: '1rem' }}>
                    <NumberInputNew disabled value={132} />
                </div>
            </Grid>
        </MainContent>
    );
});
