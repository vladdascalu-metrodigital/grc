import { describe, expect } from '@jest/globals';
import { validations } from '../additionalFieldsValidation';

describe('less than', () => {
    test.each([
        [0, 1],
        ['0', 1],
        [0.1, 0.2],
        ['0.1', 0.2],
    ])('%s less than %s', (a, b) => {
        expect(validations.lessThan(a, b)).toBeTruthy();
    });

    test.each([
        [0.2, -0.2],
        [1, 1],
        ['10', 1],
        ['321', 0.2],
    ])('%s NOT less than %s', (a, b) => {
        expect(validations.lessThan(a, b)).toBeFalsy();
    });
});

describe('less than or equal', () => {
    test.each([
        [1, 1],
        ['2', 2],
        [-0.2, 0],
        [0, 1],
        ['0', 1],
        [0.1, 0.2],
        ['0.1', 0.2],
    ])('%s less than %s or equal', (a, b) => {
        expect(validations.lessThanEq(a, b)).toBeTruthy();
    });

    test.each([
        [0.2, -0.2],
        ['10', 1],
        ['321', 0.2],
    ])('%s NOT less than %s and NOT equal', (a, b) => {
        expect(validations.lessThanEq(a, b)).toBeFalsy();
    });
});

describe('less than or equal', () => {
    test.each([
        [1, 0],
        ['2', 1],
        [0.2, 0],
        [0.3, 0.2],
        ['0.3', 0.2],
    ])('%s greater than %s', (a, b) => {
        expect(validations.greaterThan(a, b)).toBeTruthy();
    });

    test.each([
        [-0.2, -0.2],
        ['-10', 1],
        ['321', 321],
    ])('%s NOT greater than %s', (a, b) => {
        expect(validations.greaterThan(a, b)).toBeFalsy();
    });
});

describe('greater than or equal', () => {
    test.each([
        [1, 1],
        [1, 0],
        ['2', 1],
        [0.2, 0],
        [0.3, 0.2],
        ['0.3', 0.2],
    ])('%s greater than %s', (a, b) => {
        expect(validations.greaterThanEq(a, b)).toBeTruthy();
    });

    test.each([
        [-0.3, -0.2],
        ['-10', 1],
        ['320', 321],
    ])('%s NOT greater than %s and NOT equal', (a, b) => {
        expect(validations.greaterThanEq(a, b)).toBeFalsy();
    });
});

describe('between', () => {
    test.each([
        [1, 0, 2],
        ['2', 1, 3],
        [0.2, 0, 10],
        [0.2, 0.1, 0.3],
    ])('%s between %s and %s', (a, b, c) => {
        expect(validations.between(a, b, c)).toBeTruthy();
    });

    test.each([
        [-0.3, -0.2, 1],
        [1, 1, 2],
        [1, 1, 1],
        [3, 2, 3],
        ['-10', 1, 1.1],
        ['320', 321, 400],
    ])('%s NOT between %s and %s', (a, b) => {
        expect(validations.between(a, b)).toBeFalsy();
    });
});

describe('between including boundaries', () => {
    test.each([
        [1, 1, 1],
        ['2', 2, 3],
        [0.2, 0, 10],
        [0.2, 0.1, 0.2],
    ])('%s between %s and %s including boundaries', (a, b, c) => {
        expect(validations.betweenEq(a, b, c)).toBeTruthy();
    });

    test.each([
        [-0.3, -0.2, 1],
        ['-10', 1, 1.1],
        ['320', 321, 400],
    ])('%s NOT between %s and %s including boundaries', (a, b) => {
        expect(validations.betweenEq(a, b)).toBeFalsy();
    });
});

describe('is percentage', () => {
    test.each([[1], [1.123], [22.4321], [43.432], [0], [100]])('%s is percentage', (a) => {
        expect(validations.isPercentage(a)).toBeTruthy();
    });

    test.each([[-1], [101], [100.1], ['w']])('%s NOT percentage', (a) => {
        expect(validations.isPercentage(a)).toBeFalsy();
    });
});

describe('is percentage with precision 2', () => {
    test.each([[1], [1.12], [22.41], [43.32], [0], [100]])('%s is percentage with precision 2', (a) => {
        expect(validations.isPercentage2(a)).toBeTruthy();
    });

    test.each([[-1], [101], [100.1], ['w'], [10.123], [32.976]])('%s NOT percentage with precision 2', (a) => {
        expect(validations.isPercentage2(a)).toBeFalsy();
    });
});

describe('is null', () => {
    test.each([[null], [undefined]])('%s is null', (a) => {
        expect(validations.isNull(a)).toBeTruthy();
    });

    test.each([[-1], [101], ['null']])('%s NOT null', (a) => {
        expect(validations.isNull(a)).toBeFalsy();
    });
});

describe('is not null', () => {
    test.each([[-1], [101], ['null']])('%s is notnull', (a) => {
        expect(validations.notNull(a)).toBeTruthy();
    });

    test.each([[null], [undefined]])('%s NOT notnull', (a) => {
        expect(validations.notNull(a)).toBeFalsy();
    });
});

describe('is number', () => {
    test.each([[-1], [101], [4.2], ['1'], ['2.3'], [undefined], [null]])('%s is number', (a) => {
        expect(validations.isNumber(a)).toBeTruthy();
    });

    test.each([['qwe']])('%s NOT number', (a) => {
        expect(validations.isNumber(a)).toBeFalsy();
    });
});

describe('is int number', () => {
    test.each([[-1], [101], ['1'], ['2'], [32], [null], [undefined]])('%s is int number', (a) => {
        expect(validations.isNumberInteger(a)).toBeTruthy();
    });

    test.each([['qwe'], [2.3]])('%s NOT int number', (a) => {
        expect(validations.isNumberInteger(a)).toBeFalsy();
    });
});

describe('is not empty', () => {
    test.each([['2'], ['32'], ['qwe'], ['q']])('%s is not empty', (a) => {
        expect(validations.stringNotEmpty(a)).toBeTruthy();
    });

    test.each([[undefined], [null], [''], ['   ']])('%s NOT not empty', (a) => {
        expect(validations.stringNotEmpty(a)).toBeFalsy();
    });
});

describe('max length', () => {
    test.each([
        ['24321', 5],
        ['3kjh2', 7],
        ['qwe', 12],
        ['q', 78],
    ])('%s is a string with max length %s', (a, b) => {
        expect(validations.maxLength(a, b)).toBeTruthy();
    });

    test.each([
        ['', -1],
        ['   ', 2],
        ['213421', 1],
    ])('%s NOT a string with max length %s', (a, b) => {
        expect(validations.maxLength(a, b)).toBeFalsy();
    });
});

describe('max length', () => {
    test.each([
        ['24321', 3],
        ['3kjh2', 2],
        ['qwe', 2],
        ['q', 1],
    ])('%s is a string with max length %s', (a, b) => {
        expect(validations.minLength(a, b)).toBeTruthy();
    });

    test.each([
        ['', 10],
        ['   ', 20],
        ['213421', 10],
    ])('%s NOT a string with max length %s', (a, b) => {
        expect(validations.minLength(a, b)).toBeFalsy();
    });
});

describe('isEmail', () => {
    test.each([['test.as.as.asd@qw.wq.eq21.ew'], ['test@asd.wq'], ['132423@wq.we']])('%s is email', (a) => {
        expect(validations.isEmail(a)).toBeTruthy();
    });

    test.each([['123'], ['ewqr@ds'], [' wqe@   '], ['@.qwe']])('%s NOT email', (a) => {
        expect(validations.isEmail(a)).toBeFalsy();
    });
});

/* possible values for phone
18005551234
1 800 555 1234
+1 800 555-1234
+86 800 555 1234
1-800-555-1234
1 (800) 555-1234
(800)555-1234
(800) 555-1234
(800)5551234
800-555-1234
800.555.1234
800 555 1234x5678
8005551234 x5678
1    800    555-1234
1----800----555-1234
 */
describe('isPhone', () => {
    test.each([['18005551234'], ['+1 800 555-1234'], ['1 (800) 555-1234'], ['8005551234 x5678']])(
        '%s is phone',
        (a) => {
            expect(validations.isPhone(a)).toBeTruthy();
        }
    );

    test.each([['8005551234 xx5678'], ['-18005551234'], ['++18005551234'], ['@.qwe']])('%s NOT phone', (a) => {
        expect(validations.isPhone(a)).toBeFalsy();
    });
});
