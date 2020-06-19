import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../Button';
import Grid from '../Grid';

storiesOf('Forms/Button/depricated', module)
    .add('Primary', () => <Button status="primary" onClick={action('clicked')} text="Approve" />)
    .add('Error', () => <Button status="error" onClick={action('clicked')} text="Approve" />)
    .add('Secondary', () => <Button status="secondary" onClick={action('clicked')} text="Approve" />)
    .add('Success', () => <Button status="success" onClick={action('clicked')} text="Approve" />);

storiesOf('Forms/Button', module).add('all', () => (
    <Grid cols="3" alignItems="center" justifyContent="center">
        <h3>small</h3>
        <h3>medium/default</h3>
        <h3>large</h3>

        <Button size="small" onClick={action('clicked')} text="Default" />
        <Button onClick={action('clicked')} text="Default" />
        <Button size="large" onClick={action('clicked')} text="Default" />

        <Button size="small" onClick={action('clicked')} text="Disabled" disabled />
        <Button onClick={action('clicked')} text="Disabled" disabled />
        <Button size="large" onClick={action('clicked')} text="Disabled" disabled />

        <Button size="small" onClick={action('clicked')} text="Success" color="success" />
        <Button onClick={action('clicked')} text="Success" color="success" />
        <Button size="large" onClick={action('clicked')} text="Success" color="success" />

        <Button size="small" onClick={action('clicked')} text="Neutral" color="neutral" />
        <Button onClick={action('clicked')} text="Neutral" color="neutral" />
        <Button size="large" onClick={action('clicked')} text="Neutral" color="neutral" />

        <Button size="small" onClick={action('clicked')} text="Danger" color="danger" />
        <Button onClick={action('clicked')} text="Danger" color="danger" />
        <Button size="large" onClick={action('clicked')} text="Danger" color="danger" />

        <Button size="small" onClick={action('clicked')} text="Default" isOutlined />
        <Button onClick={action('clicked')} text="Default" isOutlined />
        <Button size="large" onClick={action('clicked')} text="Default" isOutlined />

        <Button size="small" onClick={action('clicked')} text="Success" color="success" isOutlined />
        <Button onClick={action('clicked')} text="Success" color="success" isOutlined />
        <Button size="large" onClick={action('clicked')} text="Success" color="success" isOutlined />

        <Button size="small" onClick={action('clicked')} text="Neutral" color="neutral" isOutlined />
        <Button onClick={action('clicked')} text="Neutral" color="neutral" isOutlined />
        <Button size="large" onClick={action('clicked')} text="Neutral" color="neutral" isOutlined />

        <Button size="small" onClick={action('clicked')} text="Danger" color="danger" isOutlined />
        <Button onClick={action('clicked')} text="Danger" color="danger" isOutlined />
        <Button size="large" onClick={action('clicked')} text="Danger" color="danger" isOutlined />
    </Grid>
));
