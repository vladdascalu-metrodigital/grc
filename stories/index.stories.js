import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from '../Button';
import FileUpload from '../FileUpload';

import '../node_modules/mrc-component-library/public/css/bundle.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('Primary', () => <Button status="primary" onClick={action('clicked')} text="Approve" />)
  .add('Error', () => <Button status="error" onClick={action('clicked')} text="Approve" />)
  .add('Secondary', () => <Button status="secondary" onClick={action('clicked')} text="Approve" />)
  .add('Success', () => <Button status="success" onClick={action('clicked')} text="Approve" />);

storiesOf('FileUpload', module)
  .add('standard', () => <FileUpload labelSelect={"select file"} updateFile={action('uploadAttachment')} selectDisabled={false} uploadDisabled={false}/>);
