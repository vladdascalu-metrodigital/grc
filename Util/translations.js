import {addCsrfToken} from './csrf';

// the values defined here are only used for development
// only add entries that are used in global-react-components, other translations are defined in services themselves
// (this makes it easier to see which keys are actually used or can be cleaned up)
let translations = {
    'mrc.file.select': 'SELECT FILE',
    'mrc.file.upload': 'UPLOAD FILE',
    'mrc.attachments.title': 'Attachments',
    'mrc.attachments.fields.title': 'Title',
    'mrc.attachments.fields.file': 'Selected file',
    'mrc.attachments.noattachments': 'No Attachments',

    'mrc.customerdetails.fields.customernumber': 'Customer Number',
    'mrc.customerdetails.fields.taxnumber': 'Tax Number',
    'mrc.customerdetails.fields.legalform': 'Legal Form',
    'mrc.customerdetails.fields.email': 'E-Mail',
    'mrc.customerdetails.fields.phone': 'Phone',
    'mrc.customerdetails.fields.mobile': 'Mobile',
    'mrc.customerdetails.fields.street': 'Street',
    'mrc.customerdetails.fields.zipcity': 'ZIP/City',
    'mrc.customerdetails.fields.registration': 'Registration',
};

export const addTranslations = (update) => {
    if (update) {
        translations = Object.assign({}, translations, update);
    }
};

export const lookup = (key) => {
    const translation = translations[key];
    if (translation) { return translation;}
    else {
        let newTranslation = {};
        newTranslation[key] = key;
        translations = Object.assign({}, translations, newTranslation);
        return key;
    }
};
export const reverseLookup = (translation) => {
    Object.keys(translations)
        .forEach(function eachKey(key) {
            if (translations[key] == translation) {
                return key;
            }
        });
    return translation;
};

const headers = new Headers();
headers.append('Content-Type', 'application/json;charset=UTF-8');
addCsrfToken(headers);
const request = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Object.keys(translations)),
    credentials: 'include'
};
// it doesn't matter if this fails because it will automatically be retried more than often enough
fetch('/creditlimit/api/requestedtranslations', request);
