import * as _ from 'lodash';

const prepayments = {
    DEFAULT: {
        amount: 0,
        product: 'mrc.payment.Bank_Transfer',
        period: 'mrc.payment.0',
    },
    RU: {
        amount: 1,
        product: 'mrc.payment.Bank_Transfer',
        period: 'mrc.payment.0',
    },
    HR: {
        amount: 0,
        product: 'mrc.payment.Bank_Transfer',
        period: 'mrc.payment.0',
    },
    // TODO: Other countries with different setup can have different data
};

const defaultPayments = {
    DE: {
        product: 'mrc.payment.METRO_Top',
        period: 'mrc.payment.Ende_des_Monats',
        debitType: 'mrc.payment.Basislastschriftmandat',
    },
};

export function getPrepaymentConfig(country) {
    let prepayment = _.get(prepayments, country.toUpperCase());
    if (_.isNil(prepayment)) {
        prepayment = _.get(prepayments, 'DEFAULT');
    }
    return prepayment;
}

export function dataForPrepayment(
    limit,
    paymentAllowanceCd,
    creditSettleTypeCd,
    creditSettlePeriodCd,
    creditSettleFrequencyCd
) {
    const validAmount = isNaN(limit) ? null : parseFloat(limit);
    if (validAmount === null || isNaN(validAmount)) {
        return false;
    }
    return (
        limit <= 10 &&
        limit >= 0 &&
        paymentAllowanceCd === '3' &&
        creditSettleTypeCd === '2' &&
        creditSettlePeriodCd === '0' &&
        (!creditSettleFrequencyCd || _.isNil(creditSettleFrequencyCd) || creditSettleFrequencyCd == '')
    );
}

export function dataForPrepaymentWithPrefix(
    country,
    limit,
    paymentAllowanceCd,
    creditProduct,
    creditPeriod,
    debitType
) {
    // the creditProduct with the prefix can be different from one country to another. Ex. for DE, Bank Transfer
    // product is UEBERWEISER
    let prepayment = _.get(prepayments, country.toUpperCase());
    if (_.isNil(prepayment)) {
        prepayment = _.get(prepayments, 'DEFAULT');
    }
    const validAmount = isNaN(limit) ? null : parseFloat(limit);
    if (validAmount === null || isNaN(validAmount)) {
        return false;
    }

    return (
        limit <= 10 &&
        limit >= 0 &&
        paymentAllowanceCd === '3' &&
        translatePaymentIfNeeded(creditProduct) === prepayment.product &&
        translatePaymentIfNeeded(creditPeriod) === prepayment.period &&
        (!debitType || _.isNil(debitType) || debitType == '')
    );
}

export const getDefaultPayment = (country, availablePayments) => {
    const defaultPayment = _.get(defaultPayments, country);
    if (_.isNil(defaultPayment) || !isValidPaymentMethod(defaultPayment, availablePayments)) {
        const firstAvailablePayment = getFirstValidPayment(availablePayments);
        return {
            defaultProduct: translatePaymentIfNeeded(firstAvailablePayment.creditProduct),
            defaultPeriod: translatePaymentIfNeeded(firstAvailablePayment.creditPeriod),
            defaultDebitType: translatePaymentIfNeeded(firstAvailablePayment.debitType),
        };
    }

    return {
        defaultProduct: translatePaymentIfNeeded(defaultPayment.product),
        defaultPeriod: translatePaymentIfNeeded(defaultPayment.period),
        defaultDebitType: translatePaymentIfNeeded(defaultPayment.debitType),
    };
};

export const getPaymentDataByType = (customer, type, field) => {
    switch (type) {
        case 'WISH':
            return _.get(customer, 'limit.wish.' + field);
        case 'APPLIED':
            return _.get(customer, 'limit.applied.' + field);
        case 'NEW':
            return _.get(customer, 'limit.new.' + field);
        default:
            return null;
    }
};

export const translatePaymentIfNeeded = (payment) => {
    return _.isNil(payment) || payment === ''
        ? null
        : payment.includes('mrc.payment.')
        ? payment
        : 'mrc.payment.' + payment.split(' ').join('_');
};

export const extractCreditProducts = (defaultProduct, availablePayments) => {
    const allCreditProducts = availablePayments.map((p) => p.creditProduct);
    if (_.isNil(defaultProduct)) {
        return Array.from(new Set(allCreditProducts)).sort();
    }
    let products = [defaultProduct];
    Array.from(new Set(allCreditProducts))
        .sort()
        .map((p) => {
            if (
                defaultProduct !== p &&
                'mrc.payment.' + p.split(' ').join('_').toLowerCase() !== defaultProduct.toLowerCase()
            ) {
                products.push(translatePaymentIfNeeded(p));
            }
        });
    return products;
};

export const extractCreditPeriods = (availablePayments, creditProduct) => {
    const creditPeriods = availablePayments
        .filter(
            (p) =>
                p.creditProduct === creditProduct ||
                'mrc.payment.' + p.creditProduct.split(' ').join('_').toLowerCase() === creditProduct.toLowerCase()
        )
        .map((p) => translatePaymentIfNeeded(p.creditPeriod));
    return Array.from(new Set(creditPeriods)).sort(function (a, b) {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
};

export const extractDebitTypes = (availablePayments, creditProduct, creditPeriod) => {
    const debitTypes = availablePayments
        .filter(
            (p) =>
                p.creditProduct === creditProduct ||
                'mrc.payment.' + p.creditProduct.split(' ').join('_').toLowerCase() === creditProduct.toLowerCase()
        )
        .filter(
            (p) =>
                p.creditPeriod === creditPeriod ||
                'mrc.payment.' + p.creditPeriod.split(' ').join('_').toLowerCase() === creditPeriod.toLowerCase()
        )
        .filter((p) => p.debitType)
        .map((p) => translatePaymentIfNeeded(p.debitType));
    return Array.from(new Set(debitTypes)).sort();
};

export const createCreditProductOptions = (availablePayments, defaultProduct) => {
    return getPossiblePaymentMethodValues(availablePayments, null, null, defaultProduct);
};

export const createCreditPeriodOptions = (availablePayments, creditProduct, defaultProduct) => {
    return _.isNil(creditProduct)
        ? null
        : getPossiblePaymentMethodValues(availablePayments, creditProduct, null, defaultProduct);
};

export const createDebitTypeOptions = (availablePayments, creditProduct, creditPeriod, defaultProduct) => {
    return _.isNil(creditProduct) || _.isNil(creditPeriod)
        ? null
        : getPossiblePaymentMethodValues(availablePayments, creditProduct, creditPeriod, defaultProduct);
};

export const getPossiblePaymentMethodValues = (availablePayments, creditProduct, creditPeriod, defaultProduct) => {
    if (!availablePayments) return null;
    const creditProductValues = extractCreditProducts(defaultProduct, availablePayments);
    if (creditProduct === null) {
        return creditProductValues;
    } else {
        const creditPeriodValues = extractCreditPeriods(availablePayments, creditProduct);
        if (creditPeriod === null) {
            return creditPeriodValues;
        } else {
            return extractDebitTypes(availablePayments, creditProduct, creditPeriod);
        }
    }
};

export const isValidPaymentMethod = (defaultPayment, availablePayments) => {
    const product =
        defaultPayment.product == null || defaultPayment.product.includes('mrc.payment.')
            ? defaultPayment.product
            : 'mrc.payment.' + defaultPayment.product.split(' ').join('_');
    const period =
        defaultPayment.period == null || defaultPayment.period.includes('mrc.payment.')
            ? defaultPayment.period
            : 'mrc.payment.' + defaultPayment.period.split(' ').join('_');
    const debitType =
        defaultPayment.debitType == null || defaultPayment.debitType.includes('mrc.payment.')
            ? defaultPayment.debitType
            : 'mrc.payment.' + defaultPayment.debitType.split(' ').join('_');
    const matchingAvailablePayments = availablePayments.filter(
        (ap) =>
            (ap.creditProduct === product ||
                (!_.isNil(ap.creditProduct) && 'mrc.payment.' + ap.creditProduct.split(' ').join('_') === product)) &&
            (ap.creditPeriod === period ||
                (!_.isNil(ap.creditPeriod) && 'mrc.payment.' + ap.creditPeriod.split(' ').join('_') === period)) &&
            (ap.debitType === debitType ||
                (!_.isNil(ap.debitType) && 'mrc.payment.' + ap.debitType.split(' ').join('_') === debitType))
    );
    return matchingAvailablePayments.length === 1;
};

function getFirstValidPayment(availablePayments) {
    const creditProductValues = extractCreditProducts(null, availablePayments);
    const creditProduct = creditProductValues[0];

    const creditPeriodValues = extractCreditPeriods(availablePayments, creditProduct);
    if (
        _.isNil(creditProduct) ||
        _.isNil(creditPeriodValues) ||
        creditPeriodValues.length === 0 ||
        _.isNil(creditPeriodValues[0])
    ) {
        return {
            creditProduct: creditProduct,
            creditPeriod: null,
            debitType: null,
        };
    }
    const creditPeriod = creditPeriodValues[0];
    const debitTypeValues = extractDebitTypes(availablePayments, creditProduct, creditPeriod);
    const debitType =
        _.isNil(debitTypeValues) || debitTypeValues.length === 0 || _.isNil(debitTypeValues[0])
            ? null
            : debitTypeValues[0];

    return {
        creditProduct: creditProduct,
        creditPeriod: creditPeriod,
        debitType: debitType,
    };
}
