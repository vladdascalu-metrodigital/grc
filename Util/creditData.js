function extractCreditProducts(availablePayments) {
    const allCreditProducts = availablePayments.map(p => p.creditProduct);
    return Array.from(new Set(allCreditProducts)).sort();
}

function extractCreditPeriods(availablePayments, creditProduct) {
    const creditPeriods = availablePayments
        .filter(p => p.creditProduct === creditProduct)
        .map(p => p.creditPeriod);
    return Array.from(new Set(creditPeriods)).sort(creditPeriodSorter);
}

function extractDebitTypes(availablePayments, creditProduct, creditPeriod) {
    const debitTypes = availablePayments
        .filter(p => p.creditProduct === creditProduct)
        .filter(p => p.creditPeriod === creditPeriod)
        .filter(p => p.debitType)
        .map(p => p.debitType);
    return Array.from(new Set(debitTypes)).sort();
}

function creditPeriodSorter(a, b) {
    const aNumber = Number.parseFloat(a);
    const bNumber = Number.parseFloat(b);
    if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        return aNumber - bNumber;
    } else {
        return a.localeCompare(b);
    }
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
