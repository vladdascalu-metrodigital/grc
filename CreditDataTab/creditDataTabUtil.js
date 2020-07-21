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
