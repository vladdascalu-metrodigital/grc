// in PL we must check if the customer limit is set to 0, if there is other countries,
// which has no such check then add the country here like RU
export function isPrepaymentAllowedForCountry(country, isCashCustomer, currentAmount) {
    const countriesWithPrepaymentAllowed = ['RU', 'HR'];
    return countriesWithPrepaymentAllowed.includes(country) || isCashCustomer || currentAmount == '0' || !currentAmount;
}

export function isHistory(parent) {
    return parent === 'history';
}

export function isCreditLimit(parent) {
    return parent === 'creditlimit';
}

export function isApproval(parent) {
    return parent === 'approval';
}

export function isCreditCorrection(parent) {
    return parent === 'creditcorrection';
}

export function isPrepayment(parent) {
    return parent === 'prepayment';
}

export function isLimitExpiryInHistory(parent, historyRequestType) {
    return isHistory(parent) && historyRequestType === 'LIMIT_EXPIRY';
}

export function isCreditCorrectionInHistory(parent, historyRequestType) {
    return isHistory(parent) && historyRequestType === 'CREDIT_CORRECTION';
}

export function isLimitRequestInHistory(parent, historyRequestType) {
    return isHistory(parent) && historyRequestType === 'LIMIT_REQUEST';
}

export function isConiRequestInHistory(parent, historyRequestType) {
    return isHistory(parent) && historyRequestType === 'CONI_REQUEST';
}

export function createProductTimePeriod(period, translatedPeriod, translationOfDays) {
    if (period) {
        return isNaN(translatedPeriod) ? translatedPeriod : [translatedPeriod, translationOfDays].join(' ');
    }
    return '-';
}
