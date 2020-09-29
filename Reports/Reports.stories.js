import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Reports from '../Reports';

storiesOf('Reports', module).add('report list', () => (
    <Reports
        data={[
            { name: 'Credit Portfolio', id: 'bar' },
            { name: 'Running Requests', id: 'foo' },
            { name: 'lorem  dajoaijsdofijjiodjfaojdfdajoaijsdofijjiodjfaojdf aj;odsjf', id: 'foo' },
            { name: 'Bar', id: 'foo' },
            { name: 'Credit Portfolio', id: 'bar' },
            { name: 'Running Requests', id: 'foo' },
            { name: 'lorem  dajoaijsdofijjiodjfaojdfdajoaijsdofijjiodjfaojdf aj;odsjf', id: 'foo' },
            { name: 'Bar', id: 'foo' },
            { name: 'Credit Portfolio', id: 'bar' },
            { name: 'Running Requests', id: 'foo' },
            { name: 'lorem  dajoaijsdofijjiodjfaojdfdajoaijsdofijjiodjfaojdf aj;odsjf', id: 'foo' },
            { name: 'Bar', id: 'foo' },
            { name: 'Credit Portfolio', id: 'bar' },
            { name: 'Running Requests', id: 'foo' },
            { name: 'lorem  dajoaijsdofijjiodjfaojdfdajoaijsdofijjiodjfaojdf aj;odsjf', id: 'foo' },
            { name: 'Bar', id: 'foo' },
            { name: 'Credit Portfolio', id: 'bar' },
            { name: 'Running Requests', id: 'foo' },
            { name: 'lorem  dajoaijsdofijjiodjfaojdfdajoaijsdofijjiodjfaojdf aj;odsjf', id: 'foo' },
            { name: 'Bar', id: 'foo' },
        ]}
    />
));
