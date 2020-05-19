import React from 'react';
import { storiesOf } from '@storybook/react';
import Bullet, { MODE as BM } from '../Bullet';

storiesOf('Fundamentals/Bullet', module).add('all bullets', () => (
    <div style={{ display: 'grid', gridGap: '2rem', padding: '2rem' }}>
        <Bullet />
        <Bullet mode="success" alt="Success!" />
        <Bullet mode={BM.ACTIVE} alt="Active!" />
        <Bullet mode={BM.WARNING} alt="Warning!" />
        <Bullet mode={BM.ERROR} alt="Error!" />
    </div>
));
