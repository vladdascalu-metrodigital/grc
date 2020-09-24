import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pill from '../Pill';

storiesOf('New UI Topics', module)
    .add('MOVED: PageHeader', () => {
        return <div>Find in /PageHeader</div>;
    })
    .add('MOVED: MainMenu', () => {
        return <div>Find in /MainMenu</div>;
    })
    .add('MOVED: PageTitle', () => {
        return <div>Find in /PageTitle</div>;
    })
    .add('NOT HERE: LanguageList', () => {
        return <div>Find in /LanguageList</div>;
    });
