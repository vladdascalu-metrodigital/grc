import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LanguageList from '../LanguageList';

import languageConfig from './fixtures/config/languages';

storiesOf('LanguageList', module).add('LanguageList', () => (
    <LanguageList config={languageConfig} languageChange={(l) => action('languageChange')(l)} />
));
