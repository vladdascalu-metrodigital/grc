import React from 'react';
import { storiesOf } from '@storybook/react';
import Card, { TYPE } from '../Card';
import DefinitionList from '../DefinitionList';

let list = [
    { term: 'email', description: 'mail@mailymail.com' },
    { term: 'phone', description: '+12 321 321 142' },
    { term: 'mobile', description: '+21 123 123 987' },
];

storiesOf('Fundamentals/DefinitionList', module).add('a simple definition list', () => (
    <DefinitionList title="Contact" list={list} />
));
