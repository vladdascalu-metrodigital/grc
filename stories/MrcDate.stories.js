import React from 'react';
import { storiesOf } from '@storybook/react';
import MrcDate from '../MrcDate';

storiesOf('Fundamentals/MrcDate', module).add('display a local date', () => <MrcDate>4/2/2020</MrcDate>);
