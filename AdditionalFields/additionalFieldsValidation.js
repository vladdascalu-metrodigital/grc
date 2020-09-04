import { getDateIfExists, parseDateForAdditionalField, setDateAtStartOfDay } from './additionalFielsUtil';

export const validations = {
    //number val
    lessThan: (value, limit) => validations.isNumber(value) && value < limit,
    lessThanEq: (value, limit) => validations.isNumber(value) && value <= limit,
    greaterThan: (value, limit) => validations.isNumber(value) && value > limit,
    greaterThanEq: (value, limit) => validations.isNumber(value) && value >= limit,
    between: (value, limitInf, limitSup) =>
        validations.greaterThan(value, limitInf) && validations.lessThan(value, limitSup),
    betweenEq: (value, limitInf, limitSup) =>
        validations.greaterThanEq(value, limitInf) && validations.lessThanEq(value, limitSup),
    notNull: (value) => !validations.isNull(value),
    isNull: (value) => value === undefined || value === null,
    isNumber: (value) => validations.isNull(value) || !isNaN(value),
    isNumberInteger: (value) =>
        validations.isNull(value) ||
        (validations.isNumber(value) && value != null && value.toString().split('.').length < 2),
    isPercentage: (value) =>
        validations.isNumber(value) && validations.greaterThanEq(value, 0) && validations.lessThanEq(value, 100),
    isPercentage2: (value) =>
        validations.isPercentage(value) &&
        (value.toString().split('.').length < 2 || value.toString().split('.')[1].length <= 2),
    lessThanEq1000: (value) => validations.lessThanEq(value, 1000),
    //string
    stringNotEmpty: (value) => value && value.toString().trim().length !== 0,
    maxLength: (value, length) => validations.isNull(value) || value.length <= length,
    maxLength255: (value) => validations.maxLength(value, 255),
    minLength: (value, length) => value && value.length >= length,
    isEmail: (value) =>
        validations.isNull(value) ||
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
        ),
    isPhone: (value) =>
        !validations.stringNotEmpty(value) ||
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(value),
    //date
    isDate: (value) => value && value.getTime() === value.getTime(),
    beforeDate: (value, dateLimit) => validations.isDate(value) && value < dateLimit,
    beforeEqDate: (value, dateLimit) => validations.isDate(value) && value <= dateLimit,
    afterDate: (value, dateLimit) => validations.isDate(value) && value > dateLimit,
    afterEqDate: (value, dateLimit) => validations.isDate(value) && value >= dateLimit,
    betweenDate: (value, dateLimitInf, dateLimitSup) =>
        validations.beforeDate(value, dateLimitSup) && validations.afterDate(value, dateLimitInf),
    betweenDateEq: (value, dateLimitInf, dateLimitSup) =>
        validations.beforeEqDate(value, dateLimitSup) && validations.afterEqDate(value, dateLimitInf),
    isDateInFuture: (value, landMark) => {
        const secondArg = getDateIfExists(landMark);
        if (validations.isNull(value)) {
            return true;
        }
        return (
            (validations.isNull(secondArg) && validations.afterEqDate(value, new Date())) ||
            (!validations.isNull(secondArg) && validations.afterEqDate(value, setDateAtStartOfDay(secondArg)))
        );
    },
};

export function additionalFieldIsValid(validationName, type, ...args) {
    try {
        if (validationName === undefined || validationName === null || validationName.trim().length === 0) {
            return true;
        }
        const validationFunc = validations[validationName];
        if (validationFunc && {}.toString.call(validationFunc) === '[object Function]') {
            if (type === 'DATE') {
                const arg0 = args !== undefined && args !== null && args.length > 0 ? args[0] : undefined;
                let arg1 = args !== undefined && args !== null && args.length > 1 ? args[1] : undefined;
                return validationFunc(parseDateForAdditionalField(arg0), arg1);
            }
            return validationFunc(...args);
        } else {
            console.log('Warning: validation ' + validationName + ' not defined or not a function!');
            return true;
        }
    } catch (err) {
        console.log(err);
        return true;
    }
}

export function additionalFieldMandatoryIsValid(mandatory, value) {
    if (mandatory !== undefined && mandatory) {
        return value !== undefined && value !== null && value.toString().trim().length > 0;
    }
    return true;
}
