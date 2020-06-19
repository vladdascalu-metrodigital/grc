import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NumberInputNew from '../NumberInputNew';
import MainContent from '../MainContent';

storiesOf('Forms/NumberInputNew', module)
    .add('Number Input', () => {
        const [number, setNumber] = useState(null);
        const changeHandler = (value) => {
            action('number change')(value);
            setNumber(value);
        };
        return (
            <MainContent>
                <NumberInputNew
                    label="A Number"
                    value={number}
                    onChange={changeHandler}
                    onValidChange={(valid) => action('valid change')(valid)}
                    onBlur={() => action('blur')('blur')}
                />
            </MainContent>
        );
    })
    .add('Required', () => {
        const [number, setNumber] = useState('');
        const changeHandler = (value) => {
            action('number change')(value);
            setNumber(value);
        };
        return (
            <MainContent>
                <NumberInputNew
                    required
                    value={number}
                    onChange={changeHandler}
                    onValidChange={(valid) => action('valid change')(valid)}
                    onBlur={() => action('blur')('blur')}
                />
            </MainContent>
        );
    })
    .add('Integer, Min: 0, Max: 100', () => {
        const [number, setNumber] = useState('1234');
        const changeHandler = (value) => {
            action('number change')(value);
            setNumber(value);
        };
        return (
            <MainContent>
                <NumberInputNew
                    label="A Number Between 0 And 100"
                    integer
                    onBlur={() => action('blur')('blur')}
                    onChange={changeHandler}
                    onValidChange={(valid) => action('valid change')(valid)}
                    value={number}
                    min={0}
                    max={100}
                />
            </MainContent>
        );
    })
    .add('Delayed onChange', () => {
        const [number, setNumber] = useState('1234');
        const changeHandler = (value) => {
            action('number change')(value);
            setNumber(value);
        };
        return (
            <MainContent>
                <NumberInputNew
                    label="A Number Between 0 And 100"
                    integer
                    onBlur={() => action('blur')('blur')}
                    onChange={changeHandler}
                    onChangeDelayed={(v) => action('delayed change')(v)}
                    onValidChange={(valid) => action('valid change')(valid)}
                    value={number}
                />
            </MainContent>
        );
    })
    .add('Invalid By Prop', () => {
        const [number, setNumber] = useState('1234');
        const changeHandler = (value) => {
            action('number change')(value);
            setNumber(value);
        };
        return (
            <MainContent>
                <NumberInputNew
                    status="invalid"
                    value={number}
                    onChange={changeHandler}
                    onValidChange={(valid) => action('valid change')(valid)}
                    onBlur={() => action('blur')('blur')}
                    validationMessages={['mrc.forms.your_custom_message']}
                />
            </MainContent>
        );
    })
    .add('Disabled', () => {
        return (
            <MainContent>
                <NumberInputNew value={12} disabled />
            </MainContent>
        );
    });
