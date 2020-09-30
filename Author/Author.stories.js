import React from 'react';
import { storiesOf } from '@storybook/react';

import Author from './index';

storiesOf('Service Components/Author', module).add('Author', () => (
    <Author
        additionalContent={() => <p>content</p>}
        name={'Vincent'}
        position={'Master of Disaster'}
        writeTime={'2020-10-10'}
    />
));
