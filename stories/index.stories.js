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

import { NavLink } from 'react-router-dom';

import 'mrc-component-library/public/css/bundle.css';
import 'mrc-component-library/public/js/bundle';
import SegmentedControl from '../SegmentedControl';

import InboxPresentation from '../InboxPresentation';
import LaunchPad from '../LaunchPad';
import CustomerSearch from '../CustomerSearch';
import RecentRequestsInfo from '../RecentRequestsInfo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
    .add('Primary', () => <Button status="primary" onClick={action('clicked')} text="Approve" />)
    .add('Error', () => <Button status="error" onClick={action('clicked')} text="Approve" />)
    .add('Secondary', () => <Button status="secondary" onClick={action('clicked')} text="Approve" />)
    .add('Success', () => <Button status="success" onClick={action('clicked')} text="Approve" />);

const logAddFile = (file, title, filetype) => console.log('adding file of type: ' + filetype);
const logDeleteFile = () => console.log('deleting file');
const logRestoreFile = () => console.log('restoring file');

storiesOf('Attachments', module)
    .add('standard', () => (
        <Attachments
            disabled={false}
            noPlaceholder={false}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'Commercial Credit Insurance',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'missing',
                    fileType: 'Bond',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                    disabled: true,
                },
                {
                    status: 'missing',
                    fileType: 'Signed contract',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit',
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
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            fileTypesForCC={['general', 'contract']}
            addAttachment={logAddFile}
            savePlaceholder={fileType => console.log('saving placeholder of type ' + fileType)}
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
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            fileTypesForCC={['general', 'contract']}
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
                    comment: 'foo',
                    uploaderPrincipalName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTimestamp: '2019-02-02',
                },
            ]}
            onSave={newValue => console.log(newValue)}
        />
    ))
    .add('2-comments', () => (
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
            onSave={newValue => console.log(newValue)}
        />
    ))
    .add('no-comments', () => <Comments onSave={newValue => console.log(newValue)} />);

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
            addNewDisabled={false}
            canAddNew={true}
            onDelete={id => console.log('deleting recommendation with id: ' + id)}
            onSave={(id, content, rating) =>
                console.log('saving recommendation with id, content, rating ', id, content, rating)
            }
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
    return <StarRating selectedIndex="2" />;
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

    return <div>{[someLink, lineBreak, activeLink]}</div>;
});

storiesOf('InboxPresentation', module).add('standard', () => (
    <InboxPresentation
        data={[
            {
                amount: '5000',
                approvedLimit: '20',
                assignedUserName: null,
                autoDecision: null,
                country: null,
                creationDate: '2020-04-16T11:30:44Z',
                currentLimit: null,
                customerName: 'test',
                customerNumber: '123354',
                customerStoreNumber: '125',
                detailsURI: 'test',
                groupAmount: 7000,
                groupSize: 2,
                id: '1',
                new: true,
                position: 'CM',
                requestDate: '2020-04-16T11:30:44Z',
                topic: 'APPROVAL_STEP_READY',
                translateKey: 'mrc.label.appliedLimit',
            },
            {
                amount: '5000',
                confirmationURI: 'test',
                creationDate: '2020-04-16T11:30:44Z',
                approvedLimit: '5000',
                assignedUserName: null,
                autoDecision: null,
                country: null,
                issueDate: '2020-04-16T11:30:44Z',
                currentLimit: null,
                customerName: 'test',
                customerNumber: '123354',
                customerStoreNumber: '125',
                detailsURI: 'test',
                groupAmount: 5000,
                groupSize: 1,
                id: '2',
                new: true,
                position: 'HOT',
                requestDate: '2020-04-16T11:30:44Z',
                topic: 'GENERAL_NOTIFICATION',
                translateKey: 'mrc.label.appliedLimit',
            },
        ]}
        filterAvailable={true}
        isTablet={false}
        confirmNotification={uri => console.log('confirmed uri: ' + uri)}
        onFilterChanged={filter => console.log('onchanged filter: ' + filter)}
        currentFilterValue={() => console.log('currentFilterValue')}
    />
));

storiesOf('LaunchPad', module)
    .add('standard desktop', () => (
        <LaunchPad
            config={{
                data: {
                    trainingMovie: {
                        available: true,
                        url: 'https://confluence.metrosystems.net/download/attachments/190837537/mrc_einfuehrung.mp4',
                    },
                    launchpad: {
                        tiles: [
                            {
                                template: '/customerstatus/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'limitCheck',
                                title: 'mrc.apps.limitcheck',
                            },
                            {
                                template: '/quickstatus/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'quickCheck',
                                title: 'mrc.apps.quickcheck',
                            },
                            {
                                template:
                                    'http://localhost:8091/creditcorrection/creditcorrection/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'creditCorrection',
                                title: 'mrc.apps.creditcorrection',
                            },
                            {
                                template:
                                    'http://localhost:8086/history/items/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'history',
                                title: 'mrc.apps.history',
                            },
                            {
                                template: 'http://localhost:8089/inbox',
                                roleKey: 'inbox',
                                title: 'mrc.apps.inbox',
                            },
                        ],
                    },
                },
            }}
            desktop={true}
            tablet={false}
            updateActiveItem={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
        />
    ))
    .add('standard mobile', () => (
        <LaunchPad
            config={{
                data: {
                    trainingMovie: {
                        available: true,
                        url: 'https://confluence.metrosystems.net/download/attachments/190837537/mrc_einfuehrung.mp4',
                    },
                    launchpad: {
                        tiles: [
                            {
                                template: '/customerstatus/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'limitCheck',
                                title: 'mrc.apps.limitcheck',
                            },
                            {
                                template: '/quickstatus/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'quickCheck',
                                title: 'mrc.apps.quickcheck',
                            },
                            {
                                template:
                                    'http://localhost:8091/creditcorrection/creditcorrection/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'creditCorrection',
                                title: 'mrc.apps.creditcorrection',
                            },
                            {
                                template:
                                    'http://localhost:8086/history/items/{country}/{storeNumber}/{customerNumber}',
                                roleKey: 'history',
                                title: 'mrc.apps.history',
                            },
                            {
                                template: 'http://localhost:8089/inbox',
                                roleKey: 'inbox',
                                title: 'mrc.apps.inbox',
                            },
                        ],
                    },
                },
            }}
            desktop={false}
            tablet={false}
            updateActiveItem={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
        />
    ));

storiesOf('CustomerSearch', module)
    .add('standard search', () => (
        <CustomerSearch
            results={null}
            isLoading={false}
            doSearch={value => console.log(value)}
            updateSearchTerm={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            hideNotification={value => console.log(value)}
            searchTerm={null}
            cleanSearchResult={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ))
    .add('standard loading', () => (
        <CustomerSearch
            results={null}
            isLoading={true}
            doSearch={value => console.log(value)}
            updateSearchTerm={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            hideNotification={value => console.log(value)}
            searchTerm={'test1'}
            cleanSearchResult={value => console.log(value)}
            match={{
                isExact: false,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ))
    .add('standard found', () => (
        <CustomerSearch
            results={[
                {
                    customerId: {
                        country: 'DE',
                        customerNumber: '12',
                        storeNumber: '1',
                    },
                    vatSpecNumber: 't11',
                    names: {
                        customer: {
                            firstName: 'foo1',
                            lastName: 'bar1',
                        },
                        companyOwner: {
                            firstName: 'foo11',
                            lastName: 'bar11',
                        },
                    },
                },
                {
                    customerId: {
                        country: 'DE',
                        customerNumber: '13',
                        storeNumber: '1',
                    },
                    vatSpecNumber: 't12',
                    names: {
                        customer: {
                            firstName: 'foo2',
                            lastName: 'bar2',
                        },
                        companyOwner: {
                            firstName: 'foo22',
                            lastName: 'bar22',
                        },
                    },
                },
            ]}
            isLoading={false}
            doSearch={value => console.log(value)}
            updateSearchTerm={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            hideNotification={value => console.log(value)}
            searchTerm={'test1'}
            cleanSearchResult={value => console.log(value)}
            match={{
                isExact: false,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ))
    .add('standard not found', () => (
        <CustomerSearch
            results={[]}
            isLoading={false}
            doSearch={value => console.log(value)}
            updateSearchTerm={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            hideNotification={value => console.log(value)}
            searchTerm={'test1'}
            cleanSearchResult={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    roleKey: 'limitCheck',
                    template: '%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%2Fcustomerstatus%2F{country}%2F{storeNumber}%2F{customerNumber}',
            }}
        />
    ));

storiesOf('RecentRequestsInfo', module)
    .add('standard desktop', () => (
        <RecentRequestsInfo
            isTablet={true}
            recentRequests={{
                data: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12346',
                    progressBar: {
                        currentStep: 3,
                        totalSteps: 4,
                        phase: 'contracting',
                    },
                    requests: [
                        {
                            requestId: '1',
                            url: 'http://localhost:8080/history/items/request/1',
                            requestStatus: {
                                trafficLight: 'yellow',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 15000,
                                groupAmount: 10000,
                                creditProduct: 'METRO Cash',
                                creditPeriod: '3',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Pending',
                                position: 'CM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: true,
                            },
                        },
                        {
                            requestId: '2',
                            url: 'http://localhost:8080/history/items/qcr/2',
                            requestStatus: {
                                trafficLight: 'quickcheck',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                                status: 'Approved',
                                position: 'MRC System',
                                requestType: 'QUICK_CHECK',
                                amountBeforeExpiry: null,
                                groupMembers: 1,
                                applied: false,
                            },
                        },
                        {
                            requestId: '3',
                            url: 'http://localhost:8080/history/items/request/3',
                            requestStatus: {
                                trafficLight: 'noColor',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 20000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Cancelled',
                                position: 'SM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                        {
                            requestId: '4',
                            url: 'http://localhost:8080/history/items/request/4',
                            requestStatus: {
                                trafficLight: 'red',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Blocked',
                                position: 'CM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                        {
                            requestId: '5',
                            url: 'http://localhost:8080/history/items/expiry/5',
                            requestStatus: {
                                trafficLight: 'green',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Activated',
                                position: 'MRC System',
                                requestType: 'LIMIT_EXPIRY',
                                amountBeforeExpiry: 2000,
                                groupMembers: 1,
                                applied: false,
                            },
                        },
                        {
                            requestId: '6',
                            url: 'http://localhost:8080/history/items/expiry/6',
                            requestStatus: {
                                trafficLight: 'no',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Failed',
                                position: 'MRC System',
                                requestType: 'LIMIT_EXPIRY',
                                amountBeforeExpiry: 2000,
                                groupMembers: 1,
                                applied: false,
                            },
                        },
                        {
                            requestId: '7',
                            url: 'http://localhost:8080/history/items/correditcorrection/7',
                            requestStatus: {
                                trafficLight: 'red',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 12000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Blocked',
                                position: 'CM',
                                requestType: 'CREDIT_CORRECTION',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                    ],
                },
            }}
        />
    ))
    .add('standard mobile', () => (
        <RecentRequestsInfo
            isTablet={false}
            recentRequests={{
                data: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12346',
                    progressBar: {
                        currentStep: 3,
                        totalSteps: 4,
                        phase: 'contracting',
                    },
                    requests: [
                        {
                            requestId: '1',
                            url: 'http://localhost:8080/history/items/request/1',
                            requestStatus: {
                                trafficLight: 'yellow',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 15000,
                                groupAmount: 10000,
                                creditProduct: 'METRO Cash',
                                creditPeriod: '3',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Pending',
                                position: 'CM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: true,
                            },
                        },
                        {
                            requestId: '2',
                            url: 'http://localhost:8080/history/items/qcr/2',
                            requestStatus: {
                                trafficLight: 'quickcheck',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                                status: 'Approved',
                                position: 'MRC System',
                                requestType: 'QUICK_CHECK',
                                amountBeforeExpiry: null,
                                groupMembers: 1,
                                applied: false,
                            },
                        },
                        {
                            requestId: '3',
                            url: 'http://localhost:8080/history/items/request/3',
                            requestStatus: {
                                trafficLight: 'noColor',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 20000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Cancelled',
                                position: 'SM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                        {
                            requestId: '4',
                            url: 'http://localhost:8080/history/items/request/4',
                            requestStatus: {
                                trafficLight: 'red',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Blocked',
                                position: 'CM',
                                requestType: 'LIMIT_REQUEST',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                        {
                            requestId: '5',
                            url: 'http://localhost:8080/history/items/expiry/5',
                            requestStatus: {
                                trafficLight: 'green',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Activated',
                                position: 'MRC System',
                                requestType: 'LIMIT_EXPIRY',
                                amountBeforeExpiry: 2000,
                                groupMembers: 1,
                                applied: false,
                            },
                        },
                        {
                            requestId: '6',
                            url: 'http://localhost:8080/history/items/expiry/6',
                            requestStatus: {
                                trafficLight: 'no',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 10000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Failed',
                                position: 'MRC System',
                                requestType: 'LIMIT_EXPIRY',
                                amountBeforeExpiry: 2000,
                                groupMembers: 1,
                                applied: false,
                            },
                        },
                        {
                            requestId: '7',
                            url: 'http://localhost:8080/history/items/correditcorrection/7',
                            requestStatus: {
                                trafficLight: 'red',
                                creationDate: '2020-04-21T12:10:46Z',
                                amount: 12000,
                                groupAmount: 0,
                                creditProduct: '3',
                                creditPeriod: 'METRO Cash',
                                debitType: 'Firmenlastschriftmandat',
                                status: 'Blocked',
                                position: 'CM',
                                requestType: 'CREDIT_CORRECTION',
                                amountBeforeExpiry: null,
                                groupMembers: 2,
                                applied: false,
                            },
                        },
                    ],
                },
            }}
        />
    ));
