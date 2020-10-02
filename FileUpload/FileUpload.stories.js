import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../Util/imports';

import FileUpload from '../FileUpload';

storiesOf('Service Components/FileUpload', module).add('standard', () => (
    <FileUpload
        labelSelect={'select file'}
        updateFile={action('uploadAttachment')}
        selectDisabled={false}
        uploadDisabled={false}
    />
));
