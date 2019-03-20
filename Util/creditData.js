function extractCreditProducts(availablePayments) {
    const allCreditProducts = availablePayments.map(p => p.creditProduct);
    return Array.from(new Set(allCreditProducts)).sort();
}

// as the payment mapper service delivery a hashlinkedset here, we won't sort the collection anymore but keep the sequence
function extractCreditPeriods(availablePayments, creditProduct) {
    const creditPeriods = availablePayments
        .filter(p => p.creditProduct === creditProduct
            || 'mrc.payment.' + p.creditProduct.split(' ').join('_').toLowerCase() === creditProduct.toLowerCase())
        .map(p => p.creditPeriod);
    return Array.from(new Set(creditPeriods)).sort(function (a, b) {
        return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
    });
}

function extractDebitTypes(availablePayments, creditProduct, creditPeriod) {
    const debitTypes = availablePayments
        .filter(p => p.creditProduct === creditProduct
            || 'mrc.payment.' + p.creditProduct.split(' ').join('_').toLowerCase() === creditProduct.toLowerCase())
        .filter(p => p.creditPeriod === creditPeriod
            || 'mrc.payment.' + p.creditPeriod.split(' ').join('_').toLowerCase() === creditPeriod.toLowerCase())
        .filter(p => p.debitType)
        .map(p => p.debitType);
    return Array.from(new Set(debitTypes)).sort();
}

// TODO This can definitely be optimized!!
export default function getPossibleValues(availablePayments, creditProduct, creditPeriod) {
    if (!availablePayments) return null;
    const creditProductValues = extractCreditProducts(availablePayments);
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

}
