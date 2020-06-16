import {
    validateBoniversumScore,
    validateCofaceScore,
    validateCrefoScore as validateCrefoScoreDE,
    validateSchufaScore,
    validateMccScore,
} from './validationDE';
import { validateLimit as validateLimitDE } from './validationDE';
import { validateReportFile as validateReportFileDE } from './validationDE';
import { validateCrefoScore as validateCrefoScorePL, validateKRDScore } from './validationPL';
import { validateLimit as validateLimitPL } from './validationPL';
import { validateReportFile as validateReportFilePL } from './validationPL';
import { validateCofaceScore as validateCofaceScoreHR } from './validationHR';
import { validateLimit as validateLimitHR } from './validationHR';
import { validateReportFile as validateReportFileHR } from './validationHR';

export function validateScore(agency, score, country) {
    switch (country.toLowerCase()) {
        // validations for DE
        case 'de':
            if (agency === 'SCHUFA_B2B' || agency === 'SCHUFA_B2C') {
                return validateSchufaScore(score);
            }
            if (agency === 'BONIVERSUM') {
                return validateBoniversumScore(score);
            }
            if (agency === 'CREFO') {
                return validateCrefoScoreDE(score);
            }
            if (agency === 'COFACE') {
                return validateCofaceScore(score);
            }
            if (agency === 'MCC_SCORE') {
                return validateMccScore(score);
            }
            return false;

        // validations for PL
        case 'pl':
            if (agency === 'CREFO') {
                return validateCrefoScorePL(score);
            }
            if (agency === 'KRD') {
                return validateKRDScore(score);
            }
            return false;

        //Validations for HR
        case 'hr':
            if (agency === 'COFACE') {
                return validateCofaceScoreHR(score);
            }
            return false;

        // default validations
        default:
            return true;
    }
}

export function validateLimit(limit, country) {
    switch (country.toLowerCase()) {
        case 'de':
            return validateLimitDE(limit);
        case 'pl':
            return validateLimitPL(limit);
        case 'hr':
            return validateLimitHR(limit);
        default:
            return true;
    }
}

export function validateReportFile(fileContent, country) {
    switch (country.toLowerCase()) {
        case 'de':
            return validateReportFileDE(fileContent);
        case 'pl':
            return validateReportFilePL(fileContent);
        case 'hr':
            return validateReportFileHR(fileContent);
        default:
            return true;
    }
}

export function isBlank(str) {
    return !str || /^\s*$/.test(str);
}

export function isPositiveInteger(str) {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

export function isInteger(str) {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str;
}
