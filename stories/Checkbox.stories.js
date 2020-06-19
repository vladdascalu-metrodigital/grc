import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import Checkbox from '../Checkbox';

storiesOf('Forms/Checkbox', module).add('Checkbox', () => {
    const [isChecked, setChecked] = useState(false);
    const handleClick = value => {
        action('clicked')(value);
        setChecked(value);
    };
    return (
        <MainContent>
            <Checkbox onChange={handleClick} checked={isChecked} label="this is checked" />
            <Checkbox disabled checked={true} label="this is disabled" />
            <Checkbox disabled checked={false} label="this is disabled" />
        </MainContent>
    );
});
