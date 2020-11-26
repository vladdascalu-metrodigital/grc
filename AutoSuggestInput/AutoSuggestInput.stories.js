import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AutoSuggestInput from './index';

storiesOf('Forms/AutoSuggestInput', module).add('Auto Suggest Input', () => {
    let [textValue, setTextValue] = useState('foobar');
    return (
        <div style={{ display: 'grid', gridGap: '1rem' }}>
            <AutoSuggestInput
                label="The Most Basic Input"
                value={textValue}
                onChange={(value) => {
                    setTextValue(value);
                    action('on changed text')(value);
                }}
                findSuggestions={(e) => {
                    return ['1', '2', e];
                }}
                getSuggestionValue={(value) => {
                    setTextValue(value);
                }}
            />
        </div>
    );
});
