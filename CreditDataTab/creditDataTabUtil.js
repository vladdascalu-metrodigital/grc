import * as _ from 'lodash';
import { translatePaymentIfNeeded } from '../Util/creditDataUtils';

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

export function dataForPrepayment(
    limit,
    paymentAllowanceCd,
    creditSettleTypeCd,
    creditSettlePeriodCd,
    creditSettleFrequencyCd
) {
    return (
        limit == '0' &&
        paymentAllowanceCd === '3' &&
        creditSettleTypeCd === '2' &&
        creditSettlePeriodCd === '0' &&
        (!creditSettleFrequencyCd || _.isNil(creditSettleFrequencyCd) || creditSettleFrequencyCd == '')
    );
}

export function dataForPrepaymentWithPrefix(limit, paymentAllowanceCd, creditProduct, creditPeriod, debitType) {
    //TODO: the creditProduct with the prefix can be different from one country to another. Ex. for DE, Bank Transfer
    // product is UEBERWEISER
    return (
        limit == '0' &&
        paymentAllowanceCd === '3' &&
        translatePaymentIfNeeded(creditProduct) === 'mrc.payment.Bank_Transfer' &&
        translatePaymentIfNeeded(creditPeriod) === 'mrc.payment.0' &&
        (!debitType || _.isNil(debitType) || debitType == '')
    );
}
