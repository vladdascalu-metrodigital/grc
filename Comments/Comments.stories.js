import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Comments from '../Comments';

import { comment, blocked, comments, previousRequestsComments } from '../fixtures/comments';

storiesOf('Service Components/Comments', module)
    .add('Standard', () => (
        <Comments
            timeoutdate={'2020-04-21T12:10:46Z'}
            comments={[comment]}
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
        />
    ))
    .add('Disabled', () => (
        <Comments
            timeoutdate={'2020-04-21T12:10:46Z'}
            comments={[comment]}
            disabled
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
        />
    ))
    .add('Blocked/Rejected', () => (
        <Comments
            timeoutDate={'2020-04-21T12:10:46Z'}
            comments={[blocked]}
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
        />
    ))
    .add('Multiple Comments', () => (
        <Comments
            comments={comments}
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
    ))
    .add('Previous Comments Loadable', () => (
        <Comments
            comments={[comment]}
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
            onClickShowPrevious={() => action('load previous')()}
        />
    ))
    .add('Previous Comments Loaded', () => (
        <Comments
            comments={[comment]}
            onSave={(newValue) => {
                action('comment save')(newValue);
            }}
            onClickShowPrevious={() => action('load previous')()}
            previousRequestsComments={previousRequestsComments}
        />
    ));
