import React from 'react';

import '../Util/imports';

import StarRating from '../StarRating';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from '../Button';
import Bullet, { MODE as BM } from '../Bullet';
import FileUpload from '../FileUpload';

import Recommendations from '../Recommendations';
import Comments from '../NewComments';

import Attachments from '../Attachments';

import { NavLink } from 'react-router-dom';

import SegmentedControl from '../SegmentedControl';

import InboxPresentation from '../InboxPresentation';
import LaunchPad from '../LaunchPad';
import CustomerSearch from '../CustomerSearch';
import RecentRequestsInfo from '../RecentRequestsInfo';

import CreditLimitCustomerDetailsGroup from '../CreditLimit/CustomerDetailsGroup';
import CreditLimitCreditData from '../CreditLimit/CreditData';
import CreditLimitRequest from '../CreditLimit/LimitRequest';
import CreditLimitRequestSubmitted from '../CreditLimit/LimitRequest/RequestSubmitted';
import CreditLimitCustomerStatus from '../CreditLimit/CustomerStatus';

import QuickCheck from '../QuickCheck';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
    .add('Primary', () => <Button status="primary" onClick={action('clicked')} text="Approve" />)
    .add('Error', () => <Button status="error" onClick={action('clicked')} text="Approve" />)
    .add('Secondary', () => <Button status="secondary" onClick={action('clicked')} text="Approve" />)
    .add('Success', () => <Button status="success" onClick={action('clicked')} text="Approve" />);

storiesOf('Bullet', module).add('all bullets', () => (
    <div style={{ display: 'grid', gridGap: '2rem', padding: '2rem' }}>
        <Bullet />
        <Bullet mode="success" alt="Success!" />
        <Bullet mode={BM.ACTIVE} alt="Active!" />
        <Bullet mode={BM.WARNING} alt="Warning!" />
        <Bullet mode={BM.ERROR} alt="Error!" />
    </div>
));

const logAddFile = (filetype, file, title, expiryDate, attachmentType) =>
    console.log('adding file of type: ' + filetype + ' and expiry: ' + expiryDate);
const logDeleteFile = () => console.log('deleting file');
const logRestoreFile = () => console.log('restoring file');

storiesOf('Attachments', module)
    .add('standard', () => (
        <Attachments
            disabled={false}
            noPlaceholder={false}
            contractUrl={'http://example.com'}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'bond',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                    disabled: true,
                },
                {
                    status: 'missing',
                    fileType: 'contract',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'missing',
                    fileType: 'delkredere',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit',
                    amount: '4000€',
                    expiryDate: new Date('2018-09-22'),
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
                    uploadTimestamp: new Date('2022-02-20'),
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'normal',
                    title: 'awsesome_company_Contract _final_2020.pdf',
                    contentType: 'application/pdf',
                    fileType: 'General',
                    amount: '300',
                    expiryDate: '',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('22-02-20'),
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'deleted',
                    title: 'HJK 20',
                    contentType: 'application/doc',
                    fileType: 'Commercial Credit Insurance',
                    amount: '500€',
                    expiryDate: new Date('2023-10-20'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '06.01.20, 16:35',
                    secondaryInteraction: 'restore',
                    handleSecondaryAction: logRestoreFile,
                },
            ]}
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            addAttachment={logAddFile}
            savePlaceholder={fileType => console.log('saving placeholder of type ' + fileType)}
            country="DE"
        />
    ))
    .add('readonly', () => (
        <Attachments
            readonly={true}
            disabled={true}
            noPlaceholder={false}
            contractUrl={'http://example.com'}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'bond',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                    disabled: true,
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit',
                    amount: '4000€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2023-10-20'),
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
            ]}
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            addAttachment={logAddFile}
            savePlaceholder={fileType => console.log('saving placeholder of type ' + fileType)}
            country="DE"
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
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit Insurance',
                    amount: '4000€',
                    expiryDate: new Date('2020-02-02'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2020-02-02'),
                    secondaryInteraction: 'delete',
                },
            ]}
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            addAttachment={() => console.log('adding file')}
            country="PL"
        />
    ))
    .add('RS', () => (
        <Attachments
            disabled={false}
            attachments={[
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Contract',
                    amount: null,
                    expiryDate: new Date('2020-02-03'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2020-02-02'),
                    secondaryInteraction: 'delete',
                    metadataJson: '[{"label":"mrc.attachments.fields.contract.start_date","value":"07.05.2020"}]',
                },
            ]}
            fileTypes={['general', 'contract']}
            addAttachment={() => console.log('adding file')}
            country="RS"
        />
    ))
    .add('provide-info-cc', () => (
        <Attachments
            disabled={false}
            noPlaceholder={false}
            contractUrl={'http://example.com'}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'bond',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                    disabled: true,
                },
                {
                    status: 'missing',
                    fileType: 'contract',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'missing',
                    fileType: 'delkredere',
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
            // fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            fileTypes={['general']}
            addAttachment={logAddFile}
            savePlaceholder={fileType => console.log('saving placeholder of type ' + fileType)}
            country="DE"
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

storiesOf('CreditLimit/CustomerDetailsGroup', module).add('standard', () => (
    <CreditLimitCustomerDetailsGroup
        customers={[
            {
                country: 'DE',
                zipCode: '40227',
                lastName: 'Anylastname',
                storeNumber: '10',
                paymentAllowanceCd: '3',
                legalFormDescription: 'Test Description',
                city: 'Düsseldorf',
                houseNumber: '2',
                creditLimitStatus: 'valid',
                vatEuNumber: '1117',
                creditSettlePeriodCd: '3',
                street: 'Heppenheimer Weg',
                badDebits: '1',
                registrationDate: '2011-10-09T00:00:00+02:00',
                creditLimit: 123.4,
                customerLastName: 'Anylastname',
                vatSpecNumber: '123/78234/8901',
                email: 'someone@example.com',
                mobilePhoneNumber: '+49 160 98765432',
                blockingReason: '30',
                checkoutCheckCode: 30,
                branchId: '1',
                limitExhaustion: 123,
                salesLine: null,
                customerNumber: '555',
                legalForm: 'LLC',
                storeAndCustomerNumber: null,
                typeCode: 'NORM',
                firstName: 'Anyfirstname',
                creditSettleTypeCd: '1',
                phoneNumber: '+49 123 4567',
                customerFirstName: 'Anyfirstname',
                creditSettleFrequencyCd: '',
                currentPayment: {
                    creditProduct: 'mrc.payment.METRO_Cash',
                    creditPeriod: 'mrc.payment.3',
                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                    backend: {
                        paymentAllowanceCd: 3,
                        creditSettleTypeCd: 1,
                        creditSettlePeriodCd: 3,
                        creditSettleFrequencyCd: null,
                        stringRepresentation: '3_1_3_null',
                    },
                },
            },
            {
                country: 'DE',
                zipCode: '40227',
                lastName: 'Anylastname',
                storeNumber: '10',
                paymentAllowanceCd: '3',
                legalFormDescription: 'Test Description',
                city: 'Düsseldorf',
                houseNumber: '2',
                creditLimitStatus: 'valid',
                vatEuNumber: '1117',
                creditSettlePeriodCd: '3',
                street: 'Heppenheimer Weg',
                badDebits: '1',
                registrationDate: '2011-10-09T00:00:00+02:00',
                creditLimit: 1711.4,
                customerLastName: 'Anylastname',
                vatSpecNumber: '123/78234/8901',
                email: 'someone@example.com',
                mobilePhoneNumber: '+49 160 98765432',
                branchId: '1',
                limitExhaustion: 123,
                salesLine: null,
                customerNumber: '88',
                legalForm: 'LLC',
                storeAndCustomerNumber: null,
                typeCode: 'NORM',
                firstName: 'Anyfirstname',
                creditSettleTypeCd: '1',
                phoneNumber: '+49 123 4567',
                customerFirstName: 'Anyfirstname',
                creditSettleFrequencyCd: '',
                blockingReason: '31',
                checkoutCheckCode: 30,
                currentPayment: {
                    creditProduct: 'mrc.payment.METRO_Cash',
                    creditPeriod: 'mrc.payment.3',
                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                    backend: {
                        paymentAllowanceCd: 3,
                        creditSettleTypeCd: 1,
                        creditSettlePeriodCd: 3,
                        creditSettleFrequencyCd: null,
                        stringRepresentation: '3_1_3_null',
                    },
                },
            },
        ]}
        countriesWithDifferentBlockingCodes={['DE']}
        isTablet={true}
    />
));

storiesOf('QuickCheck', module).add('standard status', () => (
    <QuickCheck
        customers={{
            data: {
                customers: [
                    {
                        country: 'DE',
                        zipCode: '40227',
                        lastName: 'Anylastname',
                        storeNumber: '10',
                        paymentAllowanceCd: '3',
                        legalFormDescription: 'Test Description',
                        city: 'Düsseldorf',
                        houseNumber: '2',
                        creditLimitStatus: 'valid',
                        vatEuNumber: '1117',
                        creditSettlePeriodCd: '3',
                        street: 'Heppenheimer Weg',
                        badDebits: '1',
                        registrationDate: '2011-10-09T00:00:00+02:00',
                        creditLimit: 123.4,
                        customerLastName: 'Anylastname',
                        vatSpecNumber: '123/78234/8901',
                        email: 'someone@example.com',
                        mobilePhoneNumber: '+49 160 98765432',
                        blockingReason: '30',
                        checkoutCheckCode: 30,
                        branchId: '1',
                        limitExhaustion: 123,
                        salesLine: null,
                        customerNumber: '12348',
                        legalForm: 'LLC',
                        storeAndCustomerNumber: null,
                        typeCode: 'NORM',
                        firstName: 'Anyfirstname',
                        creditSettleTypeCd: '1',
                        phoneNumber: '+49 123 4567',
                        customerFirstName: 'Anyfirstname',
                        creditSettleFrequencyCd: '',
                        currentPayment: {
                            creditProduct: 'mrc.payment.METRO_Cash',
                            creditPeriod: 'mrc.payment.3',
                            debitType: 'mrc.payment.Firmenlastschriftmandat',
                            backend: {
                                paymentAllowanceCd: 3,
                                creditSettleTypeCd: 1,
                                creditSettlePeriodCd: 3,
                                creditSettleFrequencyCd: null,
                                stringRepresentation: '3_1_3_null',
                            },
                        },
                    },
                ],
                precheckErrors: [],
            },
            loading: false,
        }}
        countriesWithDifferentBlockingCodes={['DE']}
        loadCustomerData={value => console.log(value)}
        loadRecentRequests={value => console.log(value)}
        updateUiPageTitle={value => console.log(value)}
        showAuxControl={value => console.log(value)}
        match={{
            isExact: true,
            params: {
                country: 'DE',
                storeNumber: '10',
                customerNumber: '12348',
            },
            path: '/quickstatus/:country/:storeNumber/:customerNumber/:show?',
            url: '/quickstatus/DE/10/12348',
        }}
        pendingRequest={null}
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
        request={{ data: null, loading: false }}
        requestQuick={customer => {
            return fetch(`/creditlimit/test`)
                .then(resp => resp.json())
                .catch(e => {
                    console.log('to success page');
                    return e;
                });
        }}
        isTablet={true}
    />
));

storiesOf('CreditLimit/CreditData', module).add('standard status', () => (
    <CreditLimitCreditData
        key={'1'}
        headerTitle={'CREDIT REQUEST for Test User'}
        paymentReadyToBeSelected={true}
        requestedItem={{
            id: '3636646d-0b3c-4d2e-bb3b-5098b721b4e6',
            creditData: {
                id: '982dcee2-a81a-4712-b374-046a675503b3',
                amount: null,
                creditProduct: null,
                creditPeriod: null,
                debitType: null,
            },
            customer: {
                country: 'DE',
                lastName: 'Anylastname',
                storeNumber: '10',
                customerNumber: '115',
                currentPayment: {
                    creditProduct: 'mrc.payment.METRO_Cash',
                    creditPeriod: 'mrc.payment.3',
                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                    backend: {
                        paymentAllowanceCd: 3,
                        creditSettleTypeCd: 1,
                        creditSettlePeriodCd: 3,
                        creditSettleFrequencyCd: null,
                        stringRepresentation: '3_1_3_null',
                    },
                },
                availablePayments: [
                    {
                        creditProduct: 'mrc.payment.METRO_Cash',
                        creditPeriod: 'mrc.payment.9',
                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                        backend: {
                            paymentAllowanceCd: 3,
                            creditSettleTypeCd: 1,
                            creditSettlePeriodCd: 9,
                            creditSettleFrequencyCd: null,
                            stringRepresentation: '3_1_9_null',
                        },
                    },
                    {
                        creditProduct: 'mrc.payment.METRO_Cash',
                        creditPeriod: 'mrc.payment.29',
                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                        backend: {
                            paymentAllowanceCd: 3,
                            creditSettleTypeCd: 1,
                            creditSettlePeriodCd: 29,
                            creditSettleFrequencyCd: null,
                            stringRepresentation: '3_1_29_null',
                        },
                    },
                    {
                        creditProduct: 'mrc.payment.METRO_Cash',
                        creditPeriod: 'mrc.payment.41',
                        debitType: 'mrc.payment.Einzugsermaechtigung',
                        backend: {
                            paymentAllowanceCd: 3,
                            creditSettleTypeCd: 3,
                            creditSettlePeriodCd: 41,
                            creditSettleFrequencyCd: null,
                            stringRepresentation: '3_3_41_null',
                        },
                    },
                ],
            },
            customerId: {
                salesLine: null,
                country: 'PK',
                storeNumber: '10',
                customerNumber: '555',
                storeAndCustomerNumber: null,
            },
            currentLimitExpiry: {
                limitExpiryDate: '2020-05-04T07:47:46Z',
                limitExpiryReminderDays: 14,
                resetToLimitAmount: 0,
            },
            requestedLimitExpiry: null,
            customerSapId: {
                country: 'PK',
                storeNumber: '10',
                customerNumber: '555',
                typeCd: 'NORM',
            },
            valid: false,
        }}
        setCreditData={value => console.log(value)}
        setLimitExpiry={value => console.log(value)}
        setValidity={value => console.log(value)}
        handleRequestedGroupLimitChange={value => console.log(value)}
        applyCurrentLimitAndExpiry={false}
        applyCurrentPayments={false}
        isApplyCurrentLimitAndExpiryClicked={false}
        dateFormat={'dd.MM.yyyy'}
        currentPayment={{ limit: 1000, payment: null }}
        registerCallbackOnApplyCurrentLimitAndExpiryChange={value => console.log(value)}
        countriesWithDifferentBlockingCodes={['DE']}
    />
));

storiesOf('CreditLimit/LimitRequest', module)
    .add('standard request', () => (
        <CreditLimitRequest
            cleanup={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            loadRequest={value => console.log(value)}
            loadAdditionalFields={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    roleKey: 'limitCheck',
                    template: '%limitrequests%2F{requestid}',
                },
                path: '/search/:roleKey/:template',
                url: '/search/limitCheck/%limitrequests%2F{requestid}',
            }}
            isTablet={true}
            request={{
                data: {
                    id: '59fb48c8-ed3c-4249-bcbf-0157dbe90dfa',
                    creationTimestamp: '2020-05-04T07:47:46Z',
                    attachments: [],
                    comments: [],
                    requestedItems: [
                        {
                            id: '3636646d-0b3c-4d2e-bb3b-5098b721b4e6',
                            creditData: {
                                id: '982dcee2-a81a-4712-b374-046a675503b3',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 123.4,
                                requestedCustomer: true,
                                customerLastName: 'Anylastname',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12348',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12348',
                                storeAndCustomerNumber: '10_12348',
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: null,
                            customerSapId: {
                                country: 'PK',
                                storeNumber: '10',
                                customerNumber: '555',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                        {
                            id: 'dbfb70c2-8321-4321-b972-4ae818ec23dc',
                            creditData: {
                                id: 'da82818f-a914-404b-8d79-c251c1251135',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 0,
                                customerLastName: 'Anylastname',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12349',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                storeAndCustomerNumber: null,
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: null,
                            customerSapId: {
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                    ],
                    creditProgram: null,
                    submitInfo: null,
                    requestedCustomerId: {
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12348',
                    },
                    fileTypes: ['general'],
                    collaterals: null,
                    requestDisabled: false,
                    containsContracting: true,
                    collateralAttachments: [
                        {
                            id: '43e6b4cf-2d21-4549-a087-658fc2d8a9d5',
                            contentUri: 'www.example.com',
                            title: 'Test title',
                            size: 1000,
                            contentType: 'text/html',
                            filename: 'test file name',
                            uploadTimestamp: '2020-05-04T08:39:42Z',
                            uploaderPosition: 'CC',
                            uploaderPrincipalName: 'Name Pricipal',
                            fileType: 'bank_guarantee',
                            expiryDate: '2020-05-04T08:39:42Z',
                            amount: 1000,
                            metadataJson:
                                '{"country":"DE","type":"bank_guarantee","label":"mrc.attachments.types.bank_guarantee","remark":"Collaterals","is_collateral":true,"fields":[{"field_label":"mrc.attachments.fields.bank_guarantee.amount","data_type":"Double","mandatory":true,"field_in_db":"amount","value":1234},{"field_label":"mrc.attachments.fields.bank_guarantee.validity_date","data_type":"Date","mandatory":true,"field_in_db":"expiry_date","validation_operation":"GREATER_THAN_AND_EQUALS","validation_argument":"TODAY","value":1585087200000}]}',
                        },
                        {
                            id: 'fa075664-5ea3-411b-9149-7e5b4c290007',
                            contentUri: 'www.exampleTest.com',
                            title: 'Test title 1',
                            size: 1100,
                            contentType: 'text/html',
                            filename: 'test file name 1',
                            uploadTimestamp: '2020-05-04T08:39:42Z',
                            uploaderPosition: 'CC',
                            uploaderPrincipalName: 'Name Pricipal 1',
                            fileType: 'contract',
                            expiryDate: '2020-05-04T08:39:42Z',
                            amount: 2000,
                            metadataJson:
                                '{"country":"DE","type":"contract","label":"mrc.attachments.types.contract","remark":"Digital version to improve efficiency","fields":[{"field_label":"mrc.attachments.fields.contract.start_date","data_type":"Date","mandatory":true,"validation_operation":"LESS_THAN_AND_EQUALS","validation_argument":"TODAY","value":1580508000000},{"field_label":"mrc.attachments.fields.contract.expiration_date","data_type":"Date","mandatory":true,"field_in_db":"expiry_date","validation_operation":"GREATER_THAN_AND_EQUALS","validation_argument":"TODAY","value":1582927200000}]}',
                        },
                    ],
                    editable: true,
                    customerIds: [
                        {
                            salesLine: null,
                            country: 'PK',
                            storeNumber: '10',
                            customerNumber: '555',
                            storeAndCustomerNumber: null,
                        },
                        {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12349',
                            storeAndCustomerNumber: null,
                        },
                        {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12348',
                            storeAndCustomerNumber: null,
                        },
                        {
                            salesLine: null,
                            country: 'CN',
                            storeNumber: '10',
                            customerNumber: '88',
                            storeAndCustomerNumber: null,
                        },
                    ],
                    customerSapIds: [
                        {
                            country: 'PK',
                            storeNumber: '10',
                            customerNumber: '555',
                            typeCd: 'NORM',
                        },
                        {
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12349',
                            typeCd: 'NORM',
                        },
                    ],
                },
            }}
            additionalFields={{
                requestFields: [
                    {
                        id: 'c2516cbd-4168-40f2-b19f-ef36be8d7172',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: null,
                        customerNumber: null,
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.057058Z',
                        value: 'request details',
                        textValue: null,
                        countryField: {
                            id: '3fb13df8-7f06-410f-933d-65897e7765e6',
                            mandatory: true,
                            validation: 'stringNotEmpty',
                            level: 'REQUEST',
                            order: 1,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: '9174fa82-c893-43ff-a553-fc64a6286332',
                                code: 'FIELD_TEXT_1',
                                label: 'field.text.one',
                                type: 'TEXT',
                            },
                        },
                    },
                    {
                        id: 'a3062ad8-e943-4f89-900b-f854fed9b436',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: '15',
                        customerNumber: '79',
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.056743Z',
                        value: 'customer79@store15.de',
                        textValue: null,
                        countryField: {
                            id: '36ffa349-5970-45fa-ba57-c1b03f90af84',
                            mandatory: false,
                            validation: 'stringNotEmpty',
                            level: 'CUSTOMER',
                            order: 4,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: '4ee7f3f1-f963-4f89-af43-947256967734',
                                code: 'FIELD_TEXT_2',
                                label: 'field.text.two',
                                type: 'TEXT',
                            },
                        },
                    },
                    {
                        id: 'c0e974b3-a57d-47f0-bf71-16dfc2bf1dbc',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: null,
                        customerNumber: null,
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.057542Z',
                        value: null,
                        textValue: null,
                        countryField: {
                            id: 'ec8bfbf1-e7e9-4154-9d9e-afb712c5c913',
                            mandatory: true,
                            validation: null,
                            level: 'REQUEST',
                            order: 2,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: 'edaaffae-351c-4314-98c6-449ea862148a',
                                code: 'FIELD_DATE_1',
                                label: 'field.date.one',
                                type: 'DATE',
                            },
                        },
                    },
                    {
                        id: '6904f55e-358c-48b3-bac6-119876b97172',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: null,
                        customerNumber: null,
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.057300Z',
                        value: null,
                        textValue: 'request text area field',
                        countryField: {
                            id: '26e75b6a-a76d-48d6-bf7a-481b7fa999ea',
                            mandatory: true,
                            validation: 'stringNotEmpty',
                            level: 'GROUP',
                            order: 2,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: '7394c091-3b40-4b66-8d06-1c3ee6c35384',
                                code: 'FIELD_TEXTAREA_1',
                                label: 'field.textarea.one',
                                type: 'TEXTAREA',
                            },
                        },
                    },
                    {
                        id: '68d254cb-5da2-45ea-a0c9-dfe8af2f6ddc',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: null,
                        customerNumber: null,
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.057736Z',
                        value: null,
                        textValue: null,
                        countryField: {
                            id: '979ee020-b0ea-45e8-a066-577911b2dfbb',
                            mandatory: false,
                            validation: null,
                            level: 'REQUEST',
                            order: 3,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: 'e3022bb5-b2b3-415b-b373-7533a5d3785f',
                                code: 'FIELD_CHECKBOX_1',
                                label: 'field.checkbox.one',
                                type: 'CHECKBOX',
                            },
                        },
                    },
                    {
                        id: 'c2bba016-a4fc-4e09-a08b-34281afabdc1',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12346',
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.053685Z',
                        value: '275000',
                        textValue: null,
                        countryField: {
                            id: '4ccb5d82-914f-4a02-900d-f78239cfeb90',
                            mandatory: true,
                            validation: 'isNumber',
                            level: 'CUSTOMER',
                            order: 1,
                            section: 'CUSTOMER_DETAILS',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: 'aad7740b-8a83-47bc-a869-ee37e994165d',
                                code: 'FIELD_NUMBER_1',
                                label: 'field.number.one',
                                type: 'NUMBER',
                            },
                        },
                    },
                    {
                        id: '8443140f-70a0-411f-8c86-72791f1a74c3',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12346',
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.054922Z',
                        value: 'customer12346@store10.de',
                        textValue: null,
                        countryField: {
                            id: '577ff165-8fe8-4f32-b7e4-cee33b110c23',
                            mandatory: false,
                            validation: 'isEmail',
                            level: 'CUSTOMER',
                            order: 1,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: 'a3665db1-f764-4d98-ae80-8e4a93db2e56',
                                code: 'FIELD_TEXT_1',
                                label: 'field.text.one',
                                type: 'TEXT',
                            },
                        },
                    },
                    {
                        id: '31661a97-5e8b-4a32-9d81-3248c072ce0e',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12346',
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.054354Z',
                        value: '15000',
                        textValue: null,
                        countryField: {
                            id: '2697370e-89fd-4354-8be0-ebb8597a1da0',
                            mandatory: false,
                            validation: 'isNumber',
                            level: 'GROUP',
                            order: 1,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: '737df143-2d6c-45f5-bbfd-cf35230b0ef5',
                                code: 'FIELD_NUMBER_2',
                                label: 'field.number.two',
                                type: 'NUMBER',
                            },
                        },
                    },
                    {
                        id: '3b1a66de-f9bd-410a-867a-95dad7383624',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12346',
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.056200Z',
                        value: '2',
                        textValue: null,
                        countryField: {
                            id: '766c7bce-fdfa-4ab9-b29c-579437081951',
                            mandatory: false,
                            validation: 'isNumber',
                            level: 'CUSTOMER',
                            order: 3,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: 'c522faa5-49cb-4a81-88ac-2bebff70abc0',
                                code: 'FIELD_NUMBER_2',
                                label: 'field.number.two',
                                type: 'NUMBER',
                            },
                        },
                    },
                    {
                        id: '40c2a30b-a5cc-4963-9011-440b754583ba',
                        requestId: '1',
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12346',
                        groupId: null,
                        creationTimestamp: '2020-05-04T07:23:03.055366Z',
                        value: '1',
                        textValue: null,
                        countryField: {
                            id: 'aeabff28-529f-4f70-bfb9-376662aaf959',
                            mandatory: true,
                            validation: 'isNumber',
                            level: 'CUSTOMER',
                            order: 2,
                            section: 'CREDIT_DATA',
                            reusable: true,
                            endTimestamp: null,
                            country: 'DE',
                            options: null,
                            field: {
                                id: 'bcc73aab-a769-458a-83a9-fc0e29dc7845',
                                code: 'FIELD_NUMBER_1',
                                label: 'field.number.one',
                                type: 'NUMBER',
                            },
                        },
                    },
                ],
            }}
            addComment={value => console.log(value)}
            addAttachment={value => console.log(value)}
            setCreditData={value => console.log(value)}
            setLimitExpiry={value => console.log(value)}
            submitRequest={value => console.log(value)}
            cancelRequest={value => console.log(value)}
            getMdwData={data => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        return [
                            {
                                id: '6d4d11798482a1c24a0d12a2466dbec5ccae89758f3117cc6b12a5ff4e895b98',
                                customerCreditData: {
                                    id: 'TestCreditData',
                                    country: 'DE',
                                    storeNumber: '10',
                                    customerNumber: '12348',
                                    sellValNspLyl3m: 1,
                                    sellValDfMaxL12m: 1,
                                    sellValNspL1m: 1,
                                    faxNoInd: 1,
                                    legalCaseInd: 1,
                                    legalDurationTime: 1,
                                    metroplusRelation: 1,
                                    monitionLevelMaxL12m: 1,
                                    monthId: 1,
                                    numDebitEntriesL12m: 1,
                                    numInvoicesL3m: 1,
                                    numInvoicesLytm: 1,
                                    numInvoicesYtm: 1,
                                    numPurchasesL12m: 1,
                                    numPurchasesL3m: 1,
                                    numPurchasesL6m: 1,
                                    sellValNspL3m: 1,
                                    sellValDfdMax1L12m: 1,
                                    sellValDfdMax2L12m: 1,
                                    sellValNspL12m: 1,
                                    sellValNspL6m: 1,
                                    sellValNspLytm: 1,
                                    sellValNspYtm: 1,
                                    timezoneCd: 1,
                                    numPurchasesL1m: 1,
                                    numPurchasesFStoreL1m: 1,
                                    numPurchasesFStoreL3m: 1,
                                    numPurchasesFStoreL6m: 1,
                                    numPurchasesFStoreL12m: 1,
                                    numInvoicesL1m: 1,
                                    numInvoicesL6m: 1,
                                    numInvoicesL12m: 1,
                                    sellValNspL12mHStore: 1,
                                    sellValNspL12mFStore: 1,
                                    sellValNspL24m: 1,
                                    sellValNspFL12m: 1,
                                    sellValNspNfL12m: 1,
                                    sellValNnbpL12m: 1,
                                },
                                customer: {
                                    country: 'DE',
                                },
                                behaviourDataList: [
                                    {
                                        country: 'DE',
                                        customerNumber: '12348',
                                        storeNumber: '10',
                                        behaviouralCode: 1,
                                        behvSellValNspL12m: 1,
                                        behvSellValNspYtm: 1,
                                        behvSellValNspLytm: 1,
                                        behvSellValNspForecast: 1,
                                        behvSellValNspL1m: 1,
                                        behvSellValNspL3m: 1,
                                        behvSellValNspL6m: 1,
                                    },
                                    {
                                        country: 'DE',
                                        customerNumber: '12348',
                                        storeNumber: '10',
                                        behaviouralCode: 2,
                                        behvSellValNspL12m: 2,
                                        behvSellValNspYtm: 2,
                                        behvSellValNspLytm: 2,
                                        behvSellValNspForecast: 2,
                                        behvSellValNspL1m: 2,
                                        behvSellValNspL3m: 2,
                                        behvSellValNspL6m: 2,
                                    },
                                ],
                            },
                        ];
                    });
            }}
            getCreditPrograms={data => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        return {};
                    });
            }}
            history={{
                location: {
                    pathname: 'request',
                },
            }}
            setCreditPrograms={value => console.log(value)}
            updateAdditionalField={value => console.log(value)}
            countriesWithDifferentBlockingCodes={['DE']}
        />
    ))
    .add('standard submitted', () => (
        <CreditLimitRequestSubmitted
            data={{
                id: '1',
            }}
        />
    ));

storiesOf('CreditLimit/CustomerStatus', module)
    .add('standard', () => (
        <CreditLimitCustomerStatus
            customers={{
                data: {
                    customers: [
                        {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: 'Anylastname',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            legalFormDescription: 'Test Description',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 123.4,
                            customerLastName: 'Anylastname',
                            vatSpecNumber: '123/78234/8901',
                            email: 'someone@example.com',
                            mobilePhoneNumber: '+49 160 98765432',
                            blockingReason: '30',
                            checkoutCheckCode: 30,
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '12348',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: 'Anyfirstname',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: 'Anyfirstname',
                            creditSettleFrequencyCd: '',
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                        },
                    ],
                    precheckErrors: [],
                },
                loading: false,
            }}
            loadPendingRequest={data => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('constststst1');
                        return {};
                    });
            }}
            countriesWithDifferentBlockingCodes={['DE']}
            loadCustomerData={value => console.log(value)}
            loadRecentRequests={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12348',
                },
                path: '/customerstatus/:country/:storeNumber/:customerNumber/:show?',
                url: '/customerstatus/DE/10/12348',
            }}
            pendingRequest={{}}
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
            request={{ data: null, loading: false }}
            requestQuick={customer => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('to success page');
                        return e;
                    });
            }}
            isTablet={true}
        />
    ))
    .add('standard pending request', () => (
        <CreditLimitCustomerStatus
            customers={{
                data: {
                    customers: [
                        {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: 'Anylastname',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            legalFormDescription: 'Test Description',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 123.4,
                            customerLastName: 'Anylastname',
                            vatSpecNumber: '123/78234/8901',
                            email: 'someone@example.com',
                            mobilePhoneNumber: '+49 160 98765432',
                            blockingReason: '30',
                            checkoutCheckCode: 30,
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '12348',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: 'Anyfirstname',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: 'Anyfirstname',
                            creditSettleFrequencyCd: '',
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                        },
                    ],
                    precheckErrors: [
                        { reason: 'strategy.init.failed.runningRequest', field: '', customers: ['DE/10/12348'] },
                    ],
                },
                loading: false,
            }}
            loadPendingRequest={data => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('constststst1');
                        return {};
                    });
            }}
            countriesWithDifferentBlockingCodes={['DE']}
            loadCustomerData={value => console.log(value)}
            loadRecentRequests={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12348',
                },
                path: '/customerstatus/:country/:storeNumber/:customerNumber/:show?',
                url: '/customerstatus/DE/10/12348',
            }}
            pendingRequest={{
                data: {
                    id: '59fb48c8-ed3c-4249-bcbf-0157dbe90dfa',
                    creationTimestamp: '2020-05-04T07:47:46Z',
                    attachments: [],
                    comments: [],
                    requestedItems: [
                        {
                            id: '3636646d-0b3c-4d2e-bb3b-5098b721b4e6',
                            creditData: {
                                id: '982dcee2-a81a-4712-b374-046a675503b3',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 123.4,
                                requestedCustomer: true,
                                customerLastName: 'Anylastname',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12348',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12348',
                                storeAndCustomerNumber: '10_12348',
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: null,
                            customerSapId: {
                                country: 'PK',
                                storeNumber: '10',
                                customerNumber: '555',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                        {
                            id: 'dbfb70c2-8321-4321-b972-4ae818ec23dc',
                            creditData: {
                                id: 'da82818f-a914-404b-8d79-c251c1251135',
                                amount: null,
                                creditProduct: null,
                                creditPeriod: null,
                                debitType: null,
                            },
                            customer: {
                                country: 'DE',
                                zipCode: '40227',
                                lastName: 'Anylastname',
                                storeNumber: '10',
                                paymentAllowanceCd: '3',
                                legalFormDescription: 'Test Description',
                                city: 'Düsseldorf',
                                houseNumber: '2',
                                creditLimitStatus: 'valid',
                                vatEuNumber: '1117',
                                creditSettlePeriodCd: '3',
                                street: 'Heppenheimer Weg',
                                badDebits: '1',
                                registrationDate: '2011-10-09T00:00:00+02:00',
                                creditLimit: 0,
                                customerLastName: 'Anylastname',
                                vatSpecNumber: '123/78234/8901',
                                email: 'someone@example.com',
                                mobilePhoneNumber: '+49 160 98765432',
                                branchId: '1',
                                limitExhaustion: 123,
                                salesLine: null,
                                customerNumber: '12349',
                                legalForm: 'LLC',
                                storeAndCustomerNumber: null,
                                typeCode: 'NORM',
                                firstName: 'Anyfirstname',
                                creditSettleTypeCd: '1',
                                phoneNumber: '+49 123 4567',
                                customerFirstName: 'Anyfirstname',
                                creditSettleFrequencyCd: '',
                                currentPayment: {
                                    creditProduct: 'mrc.payment.METRO_Cash',
                                    creditPeriod: 'mrc.payment.3',
                                    debitType: 'mrc.payment.Firmenlastschriftmandat',
                                    backend: {
                                        paymentAllowanceCd: 3,
                                        creditSettleTypeCd: 1,
                                        creditSettlePeriodCd: 3,
                                        creditSettleFrequencyCd: null,
                                        stringRepresentation: '3_1_3_null',
                                    },
                                },
                                availablePayments: [
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.9',
                                        debitType: 'mrc.payment.Firmenlastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 1,
                                            creditSettlePeriodCd: 9,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_1_9_null',
                                        },
                                    },
                                    {
                                        creditProduct: 'mrc.payment.METRO_Cash',
                                        creditPeriod: 'mrc.payment.31',
                                        debitType: 'mrc.payment.Basislastschriftmandat',
                                        backend: {
                                            paymentAllowanceCd: 3,
                                            creditSettleTypeCd: 3,
                                            creditSettlePeriodCd: 31,
                                            creditSettleFrequencyCd: null,
                                            stringRepresentation: '3_3_31_null',
                                        },
                                    },
                                ],
                            },
                            customerId: {
                                salesLine: null,
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                storeAndCustomerNumber: null,
                            },
                            currentLimitExpiry: {
                                limitExpiryDate: '2020-05-04T07:47:46Z',
                                limitExpiryReminderDays: 14,
                                resetToLimitAmount: 0,
                            },
                            requestedLimitExpiry: null,
                            customerSapId: {
                                country: 'DE',
                                storeNumber: '10',
                                customerNumber: '12349',
                                typeCd: 'NORM',
                            },
                            valid: false,
                        },
                    ],
                    creditProgram: null,
                    submitInfo: null,
                    requestedCustomerId: {
                        country: 'DE',
                        storeNumber: '10',
                        customerNumber: '12348',
                    },
                    fileTypes: ['general'],
                    collaterals: null,
                    requestDisabled: false,
                    containsContracting: true,
                    collateralAttachments: [],
                    editable: true,
                    customerIds: [
                        {
                            salesLine: null,
                            country: 'DE',
                            storeNumber: '10',
                            customerNumber: '12348',
                            storeAndCustomerNumber: null,
                        },
                    ],
                    customerSapIds: [],
                },
            }}
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
            request={{ data: null, loading: false }}
            requestQuick={customer => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('to success page');
                        return e;
                    });
            }}
            isTablet={true}
        />
    ))
    .add('standard precheck', () => (
        <CreditLimitCustomerStatus
            customers={{
                data: {
                    customers: [
                        {
                            country: 'DE',
                            zipCode: '40227',
                            lastName: 'Anylastname',
                            storeNumber: '10',
                            paymentAllowanceCd: '3',
                            legalFormDescription: 'Test Description',
                            city: 'Düsseldorf',
                            houseNumber: '2',
                            creditLimitStatus: 'valid',
                            vatEuNumber: '1117',
                            creditSettlePeriodCd: '3',
                            street: 'Heppenheimer Weg',
                            badDebits: '1',
                            registrationDate: '2011-10-09T00:00:00+02:00',
                            creditLimit: 123.4,
                            customerLastName: 'Anylastname',
                            vatSpecNumber: '123/78234/8901',
                            email: 'someone@example.com',
                            mobilePhoneNumber: '+49 160 98765432',
                            blockingReason: '30',
                            checkoutCheckCode: 30,
                            branchId: '1',
                            limitExhaustion: 123,
                            salesLine: null,
                            customerNumber: '12348',
                            legalForm: 'LLC',
                            storeAndCustomerNumber: null,
                            typeCode: 'NORM',
                            firstName: 'Anyfirstname',
                            creditSettleTypeCd: '1',
                            phoneNumber: '+49 123 4567',
                            customerFirstName: 'Anyfirstname',
                            creditSettleFrequencyCd: '',
                            currentPayment: {
                                creditProduct: 'mrc.payment.METRO_Cash',
                                creditPeriod: 'mrc.payment.3',
                                debitType: 'mrc.payment.Firmenlastschriftmandat',
                                backend: {
                                    paymentAllowanceCd: 3,
                                    creditSettleTypeCd: 1,
                                    creditSettlePeriodCd: 3,
                                    creditSettleFrequencyCd: null,
                                    stringRepresentation: '3_1_3_null',
                                },
                            },
                        },
                    ],
                    precheckErrors: [
                        { reason: 'strategy.init.failed.failedLegalForm', field: '', customers: ['DE/10/12348'] },
                    ],
                },
                loading: false,
            }}
            loadPendingRequest={data => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('constststst1');
                        return {};
                    });
            }}
            countriesWithDifferentBlockingCodes={['DE']}
            loadCustomerData={value => console.log(value)}
            loadRecentRequests={value => console.log(value)}
            updateUiPageTitle={value => console.log(value)}
            showAuxControl={value => console.log(value)}
            match={{
                isExact: true,
                params: {
                    country: 'DE',
                    storeNumber: '10',
                    customerNumber: '12348',
                },
                path: '/customerstatus/:country/:storeNumber/:customerNumber/:show?',
                url: '/customerstatus/DE/10/12348',
            }}
            pendingRequest={{}}
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
            request={{ data: null, loading: false }}
            requestQuick={customer => {
                return fetch(`/creditlimit/test`)
                    .then(resp => resp.json())
                    .catch(e => {
                        console.log('to success page');
                        return e;
                    });
            }}
            isTablet={true}
        />
    ));
