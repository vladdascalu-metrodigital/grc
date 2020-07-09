import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Comments from '../NewComments';

storiesOf('Comments', module)
    .add('Standard', () => (
        <Comments
            timeoutdate={'2020-04-21T12:10:46Z'}
            comments={[
                {
                    comment: 'foo',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
            ]}
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
        />
    ))
    .add('Blocked/Rejected', () => (
        <Comments
            timeoutDate={'2020-04-21T12:10:46Z'}
            comments={[
                {
                    comment: 'strategy.decision.blocked',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
            ]}
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
        />
    ))
    .add('Multiple Comments', () => (
        <Comments
            comments={[
                {
                    comment: 'foo',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
                {
                    comment: 'bar',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
                {
                    comment: 'bar',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
                {
                    comment: 'bar',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
                {
                    comment: 'bar',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
            ]}
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
        />
    ))
    .add('No Comments', () => (
        <Comments
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
        />
    ));
