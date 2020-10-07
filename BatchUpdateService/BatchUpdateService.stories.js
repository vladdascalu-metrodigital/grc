import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import '../Util/imports';
import BatchRequestList from './BatchRequest/BatchRequestList';
import BatchRequestLayout from './BatchRequest/BatchRequestLayout';
import BatchRequestAddModal from './BatchRequest/BatchRequestAddModal';
import { action } from '@storybook/addon-actions';

storiesOf('Services/BatchUpdateService', module)
    .add('Batch Requests List', () => {
        return (
            <BatchRequestList
                data={[
                    {
                        id: 'a1483d21-fa65-4433-ab33-2d2b4e80f0f9',
                        type: 'CREDIT_CORRECTION',
                        country: 'DE',
                        uploadDate: '2020-05-17T18:02:49.814438Z',
                        uploadUser: 'user.name@metro.de',
                        uploadFileName: 'test-file-ok-1000-records.xlsx',
                        uploadBlobContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        status: 'CANCELED',
                        processStartDate: '2020-05-17T18:02:58.053209Z',
                        processEndDate: '2020-05-17T18:03:19.527726Z',
                    },
                    {
                        id: 'e3a873f3-2e5f-484b-a4dc-8d3509b8e18d',
                        type: 'CREDIT_CORRECTION',
                        country: 'DE',
                        uploadDate: '2020-05-17T17:58:07.095211Z',
                        uploadUser: 'user.name@metro.de',
                        uploadFileName: 'test-file-ok-1000-records.xlsx',
                        uploadBlobContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        status: 'CANCELED',
                        processStartDate: '2020-05-17T17:58:14.767233Z',
                        processEndDate: '2020-05-17T17:58:34.694096Z',
                    },
                ]}
            />
        );
    })
    .add('Upload File', () => {
        return (
            <BatchRequestAddModal
                allowedCountries={['DE', 'RS', 'HR', 'PL', 'RO']}
                finish={(withRefresh) => action('BatchUpdate finish')(withRefresh)}
                upload={(country, fileContent, titleEntered, batchType) => {
                    console.log('BatchUpdate upload with' + country + ', ' + titleEntered + ', ' + batchType);
                    action('BatchUpdate upload')(country, titleEntered, batchType);
                }}
            />
        );
    })
    .add('Full page ', () => {
        return (
            <BatchRequestLayout
                currentUiPageTitleEvent={(value) => console.log(value)}
                updateUiPageTitle={(value) => console.log(value)}
                data={{
                    data: [
                        {
                            id: 'a1483d21-fa65-4433-ab33-2d2b4e80f0f9',
                            type: 'CREDIT_CORRECTION',
                            country: 'DE',
                            uploadDate: '2020-05-17T18:02:49.814438Z',
                            uploadUser: 'user.name@metro.de',
                            uploadFileName: 'test-file-ok-1000-records.xlsx',
                            uploadBlobContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            status: 'CANCELED',
                            processStartDate: '2020-05-17T18:02:58.053209Z',
                            processEndDate: '2020-05-17T18:03:19.527726Z',
                        },
                        {
                            id: 'e3a873f3-2e5f-484b-a4dc-8d3509b8e18d',
                            type: 'CREDIT_CORRECTION',
                            country: 'DE',
                            uploadDate: '2020-05-17T17:58:07.095211Z',
                            uploadUser: 'user.name@metro.de',
                            uploadFileName: 'test-file-ok-1000-records.xlsx',
                            uploadBlobContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            status: 'CANCELED',
                            processStartDate: '2020-05-17T17:58:14.767233Z',
                            processEndDate: '2020-05-17T17:58:34.694096Z',
                        },
                    ],
                }}
                config={{
                    currentLocale: 'de',
                    translations: {},
                    availableLanguages: [],
                    batchUpdateAllowedCountries: ['DE', 'PL'],
                    quickNav: {
                        reports: { show: true, url: 'http://localhost:8095/reportingservice', title: 'Reporting' },
                        launchpad: { show: true, title: 'Launchpad', url: 'http://localhost:8080/' },
                        limitCheck: {
                            show: true,
                            active: true,
                            title: 'Limit Check',
                            url: 'http://localhost:8080/creditlimit/limitcheck',
                        },
                        quickCheck: {
                            show: false,
                            title: 'Quick Check',
                            url: 'http://localhost:8080/creditlimit/quickcheck',
                        },
                        creditCorrection: {
                            show: true,
                            title: 'Credit Correction',
                            url: 'http://localhost:8091/creditlimit/creditcorrection',
                        },
                        history: { show: true, title: 'History', url: 'http://localhost:8080/creditlimit/history' },
                        batchupdate: { show: true, title: 'Batch Update', url: 'http://localhost:8778/batchupdate' },
                        inbox: { show: true, title: 'Inbox', url: 'http://localhost:8089/inbox' },
                        prepayment: {
                            show: false,
                            title: 'Prepayment',
                            url:
                                'http://localhost:8080/creditlimit/prepayment/{country}/{storeNumber}/{customerNumber}',
                            active: true,
                        },
                    },
                }}
            />
        );
    });
