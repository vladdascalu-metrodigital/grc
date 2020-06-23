import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CheckCard from '../CheckCard';
import Grid from '../Grid';
import { action } from '@storybook/addon-actions';

storiesOf('Forms/CheckCard', module).add('A check card', () => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const handleClick1 = value => {
        action('clicked card 1')(value);
        setChecked1(value);
    };
    const handleClick2 = value => {
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
});
