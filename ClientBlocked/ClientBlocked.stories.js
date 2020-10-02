import React from 'react';
import { storiesOf } from '@storybook/react';
import ClientBlocked from '../ClientBlocked';

storiesOf('Service Components/ClientBlocked', module)
    .add('blocked with text', () => <ClientBlocked size="large" text="Kunde zur Löschung vorgesehen" />)
    .add('default blocked', () => <ClientBlocked size="large" />);
