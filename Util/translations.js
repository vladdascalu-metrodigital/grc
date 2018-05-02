import {addCsrfToken} from './csrf';

// the values defined here are only used for development
// only add entries that are needed in global-react-components, service specific translations are defined in services themselves
let translations = {
    'global.file.select': 'SELECT FILE',
    'global.file.upload': 'UPLOAD FILE',
};

export const addTranslations = (update) => {
    if (update) {
        translations = Object.assign({}, translations, update);
    }
};

export const lookup = (key) => {
    const translation = translations[key];
    return translation ? translation : key;
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
// it doesn't matter if this failes because it will automatically be retried more than often enough
fetch('/creditlimit/api/requestedtranslations', request);
