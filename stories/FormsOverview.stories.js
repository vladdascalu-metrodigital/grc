import React from 'react';
import { storiesOf } from '@storybook/react';
import MainContent from '../MainContent';
import NumberInput from '../NumberInput';
import Select from '../Select';
import Grid from '../Grid';

storiesOf('Forms/Overview', module).add('An example form', () => (
    <MainContent>
        <Grid cols={3}>
            <div>
                <NumberInput />
            </div>
            <div>
                <Select />
            </div>
        </Grid>
    </MainContent>
));
