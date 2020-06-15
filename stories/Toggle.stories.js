import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import Grid from '../Grid';
import Toggle from '../Toggle';

storiesOf('Forms/Toggle', module).add('Toggle', () => {
    const [isChecked, setChecked] = useState(false);
    const handleClick = value => {
        action('clicked')(value);
        setChecked(value);
    };
    return (
        <MainContent>
            <Grid cols="1">
                <Toggle checked={isChecked} onClick={handleClick}>
                    This is the default Toggle
                </Toggle>
                <Toggle checked={isChecked} onClick={handleClick} reverse>
                    This Toggle is reversed
                </Toggle>
                <Toggle checked={isChecked} onClick={handleClick} spaceBetween>
                    This one is spaced all over the place
                </Toggle>
                <Toggle checked={false} onClick={() => action('clicked')('This click should not happen')} disabled>
                    Don't touch me
                </Toggle>
            </Grid>
        </MainContent>
    );
});
