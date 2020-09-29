import React from 'react';
import { storiesOf } from '@storybook/react';
import Bullet, { MODE as BM } from '../Bullet';

storiesOf('Fundamentals/Bullet', module).add('all bullets', () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr', gridGap: '2rem', padding: '2rem' }}>
        <Bullet /> no mode
        <Bullet mode={BM.READ} /> read
        <Bullet mode="success" alt="Success!" /> success
        <Bullet mode={BM.ACTIVE} alt="Active!" /> active
        <Bullet mode={BM.WARNING} alt="Warning!" /> warning
        <Bullet mode={BM.ERROR} alt="Error!" /> error
    </div>
));
