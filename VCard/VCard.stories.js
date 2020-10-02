import React from 'react';
import { storiesOf } from '@storybook/react';
import VCard from '../VCard';
import Card from '../Card';

export const person = {
    name: 'Dr. Peter Hahn',
    birthday: '1956-06-05',
    street: 'Massenbergstraße',
    houseNumber: '14',
    zipCode: '47387',
    city: 'Bochum',
    phoneNumber: '+49 05 47 27 779',
    mobilePhoneNumber: '+49 1711111',
    email: 'peter.hahn@betterlife.de',
};

export const incompletePerson = {
    name: 'Dr. Peter Incomplete',
    street: 'Massenbergstraße',
    houseNumber: '14',
    zipCode: '47387',
    city: 'Bochum',
    phoneNumber: '+49 05 47 27 779',
};

storiesOf('Fundamentals/VCard', module)
    .add('a vCard', () => <VCard person={person} />)
    .add('a vCard in a Card', () => (
        <Card isBlock>
            <VCard person={incompletePerson} />
        </Card>
    ));
