import React from 'react';
import { storiesOf } from '@storybook/react';
import MrcDateTime from '../MrcDateTime';

storiesOf('Fundamentals/MrcDateTime', module).add('display a local datetime', () => (
    <MrcDateTime>2020-05-04T12:34:56</MrcDateTime>
));
