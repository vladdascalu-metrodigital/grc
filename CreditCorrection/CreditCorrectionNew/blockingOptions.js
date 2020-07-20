export const setOnCustomerBlockingOptions = {
    id: 'SETONCUSTOMER',
    translationKey: 'mrc.blocking-option.setoncustomer',
    label: 'mrc.blocking-option.setoncustomer',
};
export const hardBlockingOptions = [
    {
        id: 'HARDBLOCK',
        translationKey: 'mrc.blocking-option.hardblock',
        label: 'mrc.blocking-option.hardblock',
    },
    {
        id: 'GENERALBLOCK',
        translationKey: 'mrc.blocking-option.generalblock',
        label: 'mrc.blocking-option.generalblock',
    },
];
/*
        SOFTBLOCK,
        HARDBLOCK,
        GENERALBLOCK,
        REMOVEBLOCK,
        CREDITTOCASH
 */
export const countryBlockingOptions = {
    DE: [
        {
            id: 'HARDBLOCK',
            translationKey: 'mrc.blocking-option.hardblock',
            label: 'mrc.blocking-option.hardblock',
        },
        {
            id: 'CREDITTOCASH',
            translationKey: 'mrc.blocking-option.credittocash',
            label: 'mrc.blocking-option.credittocash',
            customerLevel: true,
        },
    ],
    PL: [
        {
            id: 'GENERALBLOCK',
            translationKey: 'mrc.blocking-option.generalblock',
            label: 'mrc.blocking-option.generalblock',
        },
        {
            id: 'SOFTBLOCK',
            translationKey: 'mrc.blocking-option.softblock',
            label: 'mrc.blocking-option.softblock',
            customerLevel: true,
        },
        {
            id: 'CREDITTOCASH',
            translationKey: 'mrc.blocking-option.credittocash',
            label: 'mrc.blocking-option.credittocash',
            customerLevel: true,
        },
        {
            id: 'REMOVEBLOCK',
            translationKey: 'mrc.blocking-option.removeblock',
            label: 'mrc.blocking-option.removeblock',
            customerLevel: true,
        },
    ],
    AT: [
        {
            id: 'SOFTBLOCK',
            translationKey: 'mrc.blocking-option.softblock',
            label: 'mrc.blocking-option.softblock',
            customerLevel: true,
        },
    ],
};

export const quickGroupActions = {
    customerLevel: {
        id: 'group-customer-level',
        label: 'Set on customer Level',
    },
    blockPurchase: {
        id: 'group-block-purchase',
        label: 'Block group for any purchase',
    },
    blockCredit: {
        id: 'group-block-credit',
        label: 'Temp block group to buy on any credit',
    },
    removeLimit: {
        id: 'group-remove-limit',
        label: 'Remove limit from group',
    },
    removeBlock: {
        id: 'group-remove-block',
        label: 'Remove block from group',
    },
};

export const correctionActions = {
    noChanges: {
        id: 'action-no-changes',
        label: 'No Changes',
    },
    limit: {
        id: 'action-limit',
        label: 'Limit',
    },
    blocking: {
        id: 'action-temp-blocking',
        label: 'Temp Block to Buy on Credit',
    },
    removeBlock: {
        id: 'action-remove-block',
        label: 'RemoveBlock',
    },
};

export const creditProducts = {
    metroTop: {
        id: 'product-metro-top',
        label: 'Metro Top',
    },
    bankTransfer: {
        id: 'product-bank-transfer',
        label: 'Bank Transfer',
    },
    directDebit: {
        id: 'product-direct-debit',
        label: 'Direct Debit',
    },
};

export const creditPeriodOptions = [
    ['NULL', 'Please Choose'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
];
