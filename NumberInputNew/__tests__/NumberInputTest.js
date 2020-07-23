import { isInt, isIntOrFloat } from '../index';

describe('NumberInput', () => {
    function commonIntegerTests(validationFunc) {
        expect(validationFunc(123)).toBe(true);
        expect(validationFunc('123')).toBe(true);
        expect(validationFunc('123.')).toBe(true);
        expect(validationFunc('123.0')).toBe(true);
        expect(validationFunc('.0')).toBe(true);
        expect(validationFunc('-0')).toBe(true);
        expect(validationFunc('-1')).toBe(true);
        expect(validationFunc('-.0')).toBe(true);
        expect(validationFunc('-0.0')).toBe(true);
    }

    function commonNoNumberTests(validationFunc) {
        expect(validationFunc('123.0abc')).toBe(false);
        expect(validationFunc('123abc')).toBe(false);
        expect(validationFunc('abc123')).toBe(false);
        expect(validationFunc('.')).toBe(false);
        expect(validationFunc(',')).toBe(false);
        expect(validationFunc('123,')).toBe(false);
        expect(validationFunc(',0')).toBe(false);
        expect(validationFunc(',123')).toBe(false);
        expect(validationFunc('-')).toBe(false);
    }

    test('isInt validation', () => {
        commonIntegerTests(isInt);
        commonNoNumberTests(isInt);

        expect(isInt('321.123')).toBe(false);
        expect(isInt('.123')).toBe(false);
    });

    test('isIntOrFloat validation', () => {
        commonIntegerTests(isIntOrFloat);
        commonNoNumberTests(isIntOrFloat);

        expect(isIntOrFloat('321.123')).toBe(true);
        expect(isIntOrFloat('.123')).toBe(true);
    });
});
