function extractTypes(availablePayments) {
    const allTypes = availablePayments.map(p => p.type);
    return Array.from(new Set(allTypes)).sort();
}

function extractPeriods(availablePayments, type) {
    const periods = availablePayments
        .filter(p => p.type === type)
        .map(p => p.period);
    return Array.from(new Set(periods)).sort(periodSorter);
}

function extractDebitTypes(availablePayments, type, period) {
    const debitTypes = availablePayments
        .filter(p => p.type === type)
        .filter(p => p.period === period)
        .filter(p => p.debitType)
        .map(p => p.debitType);
    return Array.from(new Set(debitTypes)).sort();
}

function periodSorter(a, b) {
    const aNumber = Number.parseFloat(a);
    const bNumber = Number.parseFloat(b);
    if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        return aNumber - bNumber;
    } else {
        return a.localeCompare(b);
    }
}

// TODO This can definitely be optimized!!
export default function getPossibleValues(availablePayments, type, period) {
    if (!availablePayments) return null;
    const typeValues = extractTypes(availablePayments);
    if (!type) {
        return typeValues;
    } else {
        const periodValues = extractPeriods(availablePayments, type);
        if (!period) {
            return periodValues;
        } else {
            return extractDebitTypes(availablePayments, type, period);
        }
    }

}
