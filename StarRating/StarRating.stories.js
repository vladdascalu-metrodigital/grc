import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import StarRating from './index';

storiesOf('Fundamentals/StarRating', module).add('StarRating', () => {
    return <StarRating selectedIndex="2" />;
});
