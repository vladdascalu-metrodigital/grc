import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CheckCard from '../CheckCard';
import Grid from '../Grid';
import { action } from '@storybook/addon-actions';
import NumberInput from '../NumberInputNew';

storiesOf('Forms/CheckCard', module)
    .add('A Check Card', () => {
        const [isChecked1, setChecked1] = useState(false);
        const [isChecked2, setChecked2] = useState(false);
        const handleClick1 = (value) => {
            action('clicked card 1')(value);
            setChecked1(value);
        };
        const handleClick2 = (value) => {
            action('clicked card 2')(value);
            setChecked2(value);
        };
        return (
            <Grid>
                <CheckCard title="With Some Content" checked={isChecked1} onClick={handleClick1}>
                    How are you?
                </CheckCard>
                <CheckCard title="Without Content" checked={isChecked2} onClick={handleClick2} />
                <CheckCard title="Disabled" disabled onClick={handleClick1} />
            </Grid>
        );
    })
    .add('An Invalid Check Card', () => {
        const [checked, setChecked] = useState(2);
        const [numberValid, setNumberValid] = useState();
        const [numberValue, setNumberValue] = useState();
        const handleClick = (value) => {
            action('clicked card')(value);
            setChecked(value);
        };
        return (
            <Grid>
                <CheckCard title="With Some Content" checked={checked === 1} onClick={() => handleClick(1)}>
                    How are you?
                </CheckCard>
                <CheckCard
                    title="One or Two"
                    checked={checked === 2}
                    invalid={!numberValid}
                    onClick={() => handleClick(2)}
                >
                    <NumberInput
                        hideInvalid={checked !== 2}
                        value={numberValue}
                        required
                        min={1}
                        max={2}
                        onChange={setNumberValue}
                        onValidChange={setNumberValid}
                    />
                </CheckCard>
            </Grid>
        );
    })
    .add('A Small Check Card', () => {
        const [isChecked1, setChecked1] = useState(false);
        const [isChecked2, setChecked2] = useState(false);
        const handleClick1 = (value) => {
            action('clicked card 1')(value);
            setChecked1(value);
        };
        const handleClick2 = (value) => {
            action('clicked card 2')(value);
            setChecked2(value);
        };
        return (
            <Grid>
                <CheckCard title="AA" size="small" checked={isChecked1} onClick={handleClick1} />
                <CheckCard title="BB" size="small" checked={isChecked2} onClick={handleClick2} />
            </Grid>
        );
    });
