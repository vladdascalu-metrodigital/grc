import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import IFrame from './index';

storiesOf('IFrame', module).add('IFrame', () => (
    <IFrame
        title="Example Report"
        src="https://datastudio.google.com/embed/reporting/ff59c160-b8ce-45b8-9f3c-1e82a74df15c/page/kITLB"
    />
));
