const AGENCY_LIST_DE = [
    {
        key: 'SCHUFA_B2B',
        value: 'SCHUFA_B2B',
        label: 'Schufa B2B',
    },
    {
        key: 'SCHUFA_B2C',
        value: 'SCHUFA_B2C',
        label: 'Schufa B2C',
    },
    {
        key: 'BONIVERSUM',
        value: 'BONIVERSUM',
        label: 'Boniversum',
    },
    {
        key: 'CREFO',
        value: 'CREFO',
        label: 'CREFO',
    },
    {
        key: 'COFACE',
        value: 'COFACE',
        label: 'COFACE',
    },
    {
        key: 'MCC_SCORE',
        value: 'MCC_SCORE',
        label: 'MCC Score',
    },
];

const AGENCY_LIST_PL = [
    {
        key: 'CREFO',
        value: 'CREFO',
        label: 'CREFO',
    },
    {
        key: 'KRD',
        value: 'KRD',
        label: 'KRD',
    },
];

const AGENCY_LIST_HR = [
    {
        key: 'COFACE',
        value: 'COFACE',
        label: 'COFACE',
    },
];

export function getAgencyList(country) {
    switch (country.toLowerCase()) {
        case 'de':
            return AGENCY_LIST_DE;
        case 'pl':
            return AGENCY_LIST_PL;
        case 'hr':
            return AGENCY_LIST_HR;
        default:
            return [];
    }
}
