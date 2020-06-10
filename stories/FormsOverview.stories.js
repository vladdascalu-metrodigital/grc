import React from 'react';
import { storiesOf } from '@storybook/react';
import MainContent from '../MainContent';
import NumberInput from '../NumberInput';
import Grid from '../Grid';

storiesOf('Forms/Overview', module).add('An example form', () => (
    <MainContent>
        <Grid cols={3}>
            <div>
                <NumberInput />
            </div>
        </Grid>
    </MainContent>
));
