import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import Grid from '../Grid';
import Search from '../Search';

storiesOf('Forms/Search', module).add('Search', () => {
    return (
        <MainContent>
            <Grid>
                <Search
                    placeholder="Search for Something"
                    onEnterSearch={v => action('onEnterSearch')(v)}
                    onChange={v => action('onChange')(v)}
                />
            </Grid>
        </MainContent>
    );
});
