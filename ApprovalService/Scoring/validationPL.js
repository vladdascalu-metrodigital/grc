import { isBlank, isPositiveInteger } from './validation';

const MAX_ATTACHMENT_SIZE = 10000000; //10MB. Set according to application.yml spring.servlet.multipart properties

export function validateLimit(limit) {
    return isBlank(limit) || isPositiveInteger(limit);
}

export function validateReportFile(fileContent) {
    return fileContent.size <= MAX_ATTACHMENT_SIZE;
}

export function validateCrefoScore(sc) {
    return sc === undefined || isBlank(sc) || sc === 'A' || sc === 'B' || sc === 'C' || sc === '-1';
}

export function validateKRDScore(sc) {
    return isBlank(sc) || isPositiveInteger(sc);
}
