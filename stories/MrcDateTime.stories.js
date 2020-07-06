import React from 'react';
import { storiesOf } from '@storybook/react';
import MrcDateTime from '../MrcDateTime';

storiesOf('Fundamentals/MrcDateTime', module).add('display a local datetime', () => (
    <MrcDateTime>2020-06-16T11:51:59Z</MrcDateTime>
));
