import { isBlank, isPositiveInteger } from './validation';

const MAX_ATTACHMENT_SIZE = 10000000; //10MB. Set according to application.yml spring.servlet.multipart properties

export function validateLimit(limit) {
    return isBlank(limit) || isPositiveInteger(limit);
}

export function validateReportFile(fileContent) {
    return fileContent.size <= MAX_ATTACHMENT_SIZE;
}

export function validateCofaceScore(sc) {
    if (isPositiveInteger(sc)) {
        if (sc <= 99) {
            return true;
        }
    }
    return false;
}
