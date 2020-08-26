import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import CheckItem from '../CheckItem';

storiesOf('Forms/CheckItem', module).add('CheckItem', () => {
    const [isChecked, setChecked] = useState(false);
    const handleClick = (value) => {
        action('clicked')(value);
        setChecked(value);
    };
    return (
        <MainContent>
            <CheckItem onChange={handleClick} checked={isChecked} label="this is checked" />
            <CheckItem disabled checked={true} label="this is disabled" />
            <CheckItem disabled checked={false} label="this is disabled" />
        </MainContent>
    );
});
