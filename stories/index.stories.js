import React from 'react';

import StarRating from '../StarRating';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from '../Button';
import FileUpload from '../FileUpload';

import Recommendations from '../Recommendations';
import Comments from '../NewComments';

import Attachments from '../Attachments';

import { HashRouter, NavLink } from 'react-router-dom';

import '../node_modules/mrc-component-library/public/css/bundle.css';
import SegmentedControl from '../SegmentedControl';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
    .add('Primary', () => <Button status="primary" onClick={action('clicked')} text="Approve" />)
    .add('Error', () => <Button status="error" onClick={action('clicked')} text="Approve" />)
    .add('Secondary', () => <Button status="secondary" onClick={action('clicked')} text="Approve" />)
    .add('Success', () => <Button status="success" onClick={action('clicked')} text="Approve" />);

const logAddFile = () => console.log('adding file');
const logDeleteFile = () => console.log('deleting file');
const logRestoreFile = () => console.log('restoring file');

storiesOf('Attachments', module)
    .add('standard', () => (
        <Attachments
            disabled={false}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'Commercial Credit Insurance missing',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'missing',
                    fileType: 'Bond missing',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'missing',
                    fileType: 'Signed contract missing',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit Insurance',
                    amount: '4000€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '22.03.20, 10:56',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'normal',
                    title: 'awsesome_company_Contract _final_2020.pdf',
                    contentType: 'application/pdf',
                    fileType: 'General',
                    amount: '',
                    expiryDate: '',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '22.02.20, 14:53',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'deleted',
                    title: 'HJK 20',
                    contentType: 'application/doc',
                    fileType: 'Commercial Credit Insurance',
                    amount: '500€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '06.01.20, 16:35',
                    secondaryInteraction: 'restore',
                    handleSecondaryAction: logRestoreFile,
                },
            ]}
            filetypes={['general', 'delkredere', 'warenkreditversicherung']}
            fileTypesForCC={['general', 'contracting']}
            addAttachment={logAddFile}
            currentApprover="CC"
            country="PL"
        />
    ))
    .add('disabled', () => (
        <Attachments
            disabled={true}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'Commercial Credit Insurance missing',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'missing',
                    fileType: 'Bond missing',
                    secondaryInteraction: 'delete',
                },
                {
                    status: 'missing',
                    fileType: 'Signed contract missing',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit Insurance',
                    amount: '4000€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '22.03.20, 10:56',
                    secondaryInteraction: 'delete',
                },
                {
                    status: 'normal',
                    title: 'awsesome_company_Contract _final_2020.pdf',
                    contentType: 'application/pdf',
                    fileType: 'General',
                    amount: '',
                    expiryDate: '',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '22.02.20, 14:53',
                    secondaryInteraction: 'delete',
                },
                {
                    status: 'deleted',
                    title: 'HJK 20',
                    contentType: 'application/doc',
                    fileType: 'Commercial Credit Insurance',
                    amount: '500€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '06.01.20, 16:35',
                    secondaryInteraction: 'restore',
                },
            ]}
            filetypes={['general', 'delkredere', 'warenkreditversicherung']}
            fileTypesForCC={['general', 'contracting']}
            addAttachment={() => console.log('adding file')}
            currentApprover="CC"
            country="PL"
        />
    ));

storiesOf('Segmented Control', module).add('basic', () => (
    <SegmentedControl selectedSegment={'Placeholder'} labels={['Document', 'Placeholder', 'bar', 'baz']} />
));

storiesOf('Comments', module)
    .add('standard', () => (
        <Comments
            comments={[
                {
                    content: 'foo',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                },
            ]}
            canAddNew={true}
        />
    ))
    .add('2-comments', () => (
        <Comments
            comments={[
                {
                    content: 'foo',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                    editableByCurrentUser: true,
                },
                {
                    content: 'bar',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                },
            ]}
            canAddNew={true}
        />
    ));

storiesOf('Recommendations', module)
    .add('standard', () => (
        <Recommendations
            recommendations={[
                {
                    id: '1',
                    content: 'foo',
                    rating: '5',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                },
                {
                    id: '2',
                    content: 'bar',
                    rating: '4',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                    canEdit: true,
                },
            ]}
            canAddNew={true}
            onDelete={id => console.log('deleting recommendation with id: ' + id)}
            onSave={id => console.log('saving recommendation with id: ' + id)}
        />
    ))
    .add('2-recommendations', () => (
        <Recommendations
            recommendations={[
                {
                    content: 'foo',
                    rating: '5',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                    editableByCurrentUser: true,
                },
                {
                    content: 'bar',
                    rating: '5',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                },
            ]}
            canAddNew={true}
        />
    ));

storiesOf('StarRating', module).add('standard', () => {
    return <StarRating selectedindex="2" />;
});

storiesOf('FileUpload', module).add('standard', () => (
    <FileUpload
        labelSelect={'select file'}
        updateFile={action('uploadAttachment')}
        selectDisabled={false}
        uploadDisabled={false}
    />
));

storiesOf('NavLink', module).add('MRC-3820', () => {
    const activeLinkFilter = (match, pathToCheck, location) => {
        // 1. for some reason match was always false and location had no values for its entries
        // soo we have to take the real window location url for testing..
        const windowUrl = window.location.href;

        // and since in storybook our component visualization is inside of iframes,
        // and storybook itself seeming to probably have some react-router itself,
        // resulting in our windowUrl to be rather nasty, we have to do some more cheating here
        const urlParts = windowUrl.split('?id=');
        const urlLastPart = urlParts[1];

        const currentComponentsNameInsideOfUrlParts = urlLastPart.split('&');
        const currentComponentsNameInsideOfUrl = currentComponentsNameInsideOfUrlParts[0];

        const pathToCheckIsActive = pathToCheck.includes(currentComponentsNameInsideOfUrl);
        return pathToCheckIsActive;
    };
    //2. ..and put link URLs into variables
    const path1 = '/?path=/story/button--primary';
    const path2 = '/?path=/story/navlink--mrc-3820';

    //we have to include keys to the following components, because we will
    //render them from within a list (array)

    const someLink = (
        <NavLink
            key="1"
            to={{ pathname: path1 }}
            isActive={(match, location) => activeLinkFilter(match, path1)}
            exact
            activeClassName="metro-active-url-class_still-to-be-defined"
        >
            nonActive link
        </NavLink>
    );

    const activeLink = (
        <NavLink
            key="3"
            to={{ pathname: path2 }}
            isActive={(match, location) => activeLinkFilter(match, path2)}
            exact
            activeClassName="metro-active-url-class_still-to-be-defined"
        >
            active link
        </NavLink>
    );

    const lineBreak = <br key="2" />;

    //HashRouter needs a single element to render, so we should wrap our links.
    const app = <div>{[someLink, lineBreak, activeLink]}</div>;
    const routerWithLinks = <HashRouter basename="/">{app}</HashRouter>;
    return routerWithLinks;
});
