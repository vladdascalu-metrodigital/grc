import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import '../Util/imports';

import LaunchPad from '../LaunchPad';

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
                            {
                                template: 'http://localhost:8089/reportingservice',
                                roleKey: 'reports',
                                title: 'mrc.apps.reportingservice',
                            },
                        ],
                    },
                },
            }}
            desktop={true}
            tablet={false}
            updateActiveItem={(value) => console.log(value)}
            showAuxControl={(value) => console.log(value)}
            updateUiPageTitle={(value) => console.log(value)}
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
            updateActiveItem={(value) => console.log(value)}
            showAuxControl={(value) => console.log(value)}
            updateUiPageTitle={(value) => console.log(value)}
        />
    ));
