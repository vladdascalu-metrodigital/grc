import { isBlank, isPositiveInteger, isInteger } from './validation';

const MAX_ATTACHMENT_SIZE = 10000000; //10MB. Set according to application.yml spring.servlet.multipart properties

export function validateLimit(limit) {
    if (isBlank(limit)) {
        return true;
    }
    return isPositiveInteger(limit);
}

export function validateReportFile(fileContent) {
    if (fileContent.size > MAX_ATTACHMENT_SIZE) {
        return false;
    }
    return true;
}

export function validateSchufaScore(sc) {
    return isInteger(sc);
}

export function validateCrefoScore(sc) {
    return isInteger(sc);
}

export function validateBoniversumScore(sc) {
    if (isPositiveInteger(sc)) {
        const intSc = parseInt(sc);
        if (563 <= intSc && intSc <= 1079) {
            return true;
        }
        if (93000 <= intSc && intSc <= 99000) {
            return true;
        }
    }
    return false;
}

export function validateCofaceScore(sc) {
    return sc === 'X' || sc === 'R' || sc === '@' || sc === '@@' || sc === '@@@';
}

export function validateMccScore(sc) {
    if (isPositiveInteger(sc)) {
        const intSc = parseInt(sc);
        return 1 <= intSc && intSc <= 6;
    }
    return false;
}
