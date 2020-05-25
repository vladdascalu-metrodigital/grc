import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CheckCard from '../CheckCard';
import Grid from '../Grid';
import { action } from '@storybook/addon-actions';

storiesOf('Fundamentals/CheckCard', module).add('check card', () => {
    const [isChecked, setChecked] = useState(false);
    const handleClick = value => {
        action('clicked')(value);
        setChecked(value);
    };
    return (
        <Grid>
            <CheckCard title="With Some Content" checked={isChecked} onClick={handleClick}>
                How are you?
            </CheckCard>
            <CheckCard title="Without Content" checked={isChecked} onClick={handleClick} />
            <CheckCard title="Disabled" disabled checked={isChecked} onClick={handleClick} />
        </Grid>
    );
});
