import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import Grid from '../Grid';
import Search from '../Search';

storiesOf('Forms/Search', module)
    .add('Search', () => {
        return (
            <MainContent>
                <Grid>
                    <Search
                        label="Where is it?"
                        placeholder="Search for Something"
                        onEnterSearch={(v) => action('onEnterSearch')(v)}
                        onChange={(v) => action('onChange')(v)}
                        onBlur={(v) => action('blur')('blur')}
                    />
                </Grid>
            </MainContent>
        );
    })
    .add('Search Delayed', () => {
        return (
            <MainContent>
                <Grid>
                    <Search
                        label="Where is it?"
                        placeholder="Search for Something"
                        onEnterSearch={(v) => action('onEnterSearch')(v)}
                        onChange={(v) => action('onChange')(v)}
                        onChangeDelayed={(v) => action('onChangeDelayed')(v)}
                        onBlur={(v) => action('blur')('blur')}
                    />
                </Grid>
            </MainContent>
        );
    })
    .add('Disabled Search', () => {
        return (
            <MainContent>
                <Grid>
                    <Search
                        disabled
                        placeholder="Search for Something"
                        onEnterSearch={(v) => action('onEnterSearch')(v)}
                        onChange={(v) => action('onChange')(v)}
                    />
                </Grid>
            </MainContent>
        );
    });
