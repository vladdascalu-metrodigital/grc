import React from 'react';
import { storiesOf } from '@storybook/react';
import Card, { TYPE } from '../Card';

storiesOf('Fundamentals/Card', module).add('all kinds of cards', () => (
    <div style={{ display: 'grid', gridTemplateColumns: '400px 400px', gridGap: '2rem', padding: '2rem' }}>
        <Card>default</Card>
        <Card type={TYPE.PRIMARY}>primary</Card>
        <Card type={TYPE.MUTED}>muted</Card>
        <Card type={TYPE.WARNING}>warning</Card>
    </div>
));
