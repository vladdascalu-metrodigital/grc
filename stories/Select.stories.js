import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';
import Select from '../Select';

storiesOf('Forms/NumberInput', module).add('number input', () => (
    <Grid>
        <Select />
    </Grid>
));
