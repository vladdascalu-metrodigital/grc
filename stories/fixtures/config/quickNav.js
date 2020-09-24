export default {
    data: {
        quickNav: {
            reports: {
                title: 'Reporting',
                url: 'https://mrc-pp.metrosystems.net/reportingservice',
                show: true,
            },
            launchpad: {
                title: 'Launchpad',
                url: '/',
                show: true,
            },
            limitCheck: {
                active: true,
                url: '/customerstatus/{country}/{storeNumber}/{customerNumber}',
                title: 'Limit Check',
                show: true,
            },
            quickCheck: {
                active: true,
                url: '/quickstatus/{country}/{storeNumber}/{customerNumber}',
                title: 'Quick Check',
                show: true,
            },
            creditCorrection: {
                title: 'Credit Correction',
                url:
                    'https://mrc-pp.metrosystems.net/creditcorrection/creditcorrection/{country}/{storeNumber}/{customerNumber}',
                show: true,
            },
            history: {
                title: 'History',
                url: 'https://mrc-pp.metrosystems.net/history/items/{country}/{storeNumber}/{customerNumber}',
                show: true,
            },
            batchupdate: {
                title: 'Batch Update',
                url: 'https://mrc-pp.metrosystems.net/batchupdate',
                show: true,
            },
            inbox: {
                title: 'Inbox',
                url: 'https://mrc-pp.metrosystems.net/inbox',
                show: true,
            },
            prepayment: {
                active: true,
                url: '/prepayment/{country}/{storeNumber}/{customerNumber}',
                title: 'Prepayment',
                show: true,
            },
        },
    },
};
