import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import Grid from '../Grid';
import Toggle from '../Toggle';

storiesOf('Forms/Toggle', module).add('Toggle', () => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    return (
        <MainContent>
            <Grid cols="1">
                <Toggle
                    checked={isChecked1}
                    onClick={v => {
                        action('toggle')(v);
                        setChecked1(v);
                    }}
                >
                    This is the default Toggle
                </Toggle>
                <Toggle
                    checked={isChecked2}
                    onClick={v => {
                        action('toggle')(v);
                        setChecked2(v);
                    }}
                    reverse
                >
                    This Toggle is reversed
                </Toggle>
                <Toggle
                    checked={isChecked3}
                    onClick={v => {
                        action('toggle')(v);
                        setChecked3(v);
                    }}
                    spaceBetween
                >
                    This one is spaced all over the place
                </Toggle>
                <Toggle checked={false} onClick={() => action('clicked')('This click should not happen')} disabled>
                    Don't touch me
                </Toggle>
            </Grid>
        </MainContent>
    );
});
