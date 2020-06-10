import { addCsrfToken } from './csrf';

// the values defined here are only used for development
// only add entries that are used in global-react-components, other translations are defined in services themselves
// (this makes it easier to see which keys are actually used or can be cleaned up)
let translations = {
    'mrc.reports.title': 'Available Reports',
    'mrc.file.select': 'SELECT FILE',
    'mrc.file.upload': 'UPLOAD FILE',
    'mrc.attachments.title': 'Attachments',
    'mrc.attachments.fields.title': 'Title',
    'mrc.attachments.fields.file': 'Selected file',
    'mrc.attachments.noattachments': 'No Attachments',
    'mrc.attachments.unknown-mime': 'Unknown',

    'mrc.attachments.amount': 'Amount',
    'mrc.attachments.expiry': 'expiry',
    'mrc.attachments.missing': 'missing',
    'mrc.attachments.types.contract': 'Contract',
    'mrc.attachments.types.bond': 'Bond',
    'mrc.attachments.types.delkredere': 'Delkredere',
    'mrc.attachments.headline': 'Attachments',
    'mrc.attachments.contractlinktext': 'Contract Templates',

    'mrc.customerdetails.fields.customernumber': 'Customer Number',
    'mrc.customerdetails.fields.taxnumber': 'Tax Number',
    'mrc.customerdetails.fields.vateunumber': 'Vat EU Number',
    'mrc.customerdetails.fields.legalform': 'Legal Form',
    'mrc.customerdetails.fields.email': 'E-Mail',
    'mrc.customerdetails.fields.phone': 'Phone',
    'mrc.customerdetails.fields.mobile': 'Mobile',
    'mrc.customerdetails.fields.street': 'Street',
    'mrc.customerdetails.fields.zipcity': 'ZIP/City',
    'mrc.customerdetails.fields.registration': 'Customer since',
    'mrc.customerdetails.fields.companyfoundationdate': 'Company foundation date',
    'mrc.customerdetails.fields.segment': 'Segment',
    'mrc.customerdetails.fields.legalformdescription': 'Legal Form Description',
    'mrc.attachments.fields.contract.start_date': 'Start Date',
    'mrc.attachments.showDeletedAttachments': 'Show Deleted Attachments',
    'mrc.customerdata.name': 'Customer Name',

    'mrc.blockingReason.message.2': 'card misuse by customer',
    'mrc.checkoutCheckCode.message.30': 'credit block',
    'mrc.customerdata.title': 'Customer',

    'mrc.customerdata.blocked': 'Blocked Customer',
    'mrc.customerdata.contactInfo': 'Contact Info',
    'mrc.customerdata.businessInfo': 'Business Info',
    'mrc.customerdetails.fields.branch': 'Branch',

    'mrc.creditdata.current': 'Current',
    'mrc.credittab.expiry': 'Expiry',
    'mrc.credittab.granted': 'Granted',
    'mrc.credittab.exhausted': 'Exhausted',
    'mrc.credittab.limit': 'Limit',
    'mrc.creditdetails.creditproduct': 'Creditproduct',
    'mrc.credittab.new': 'New',
    'mrc.credittab.customerWish': 'Customer Wish',
    'mrc.credittab.customerGroup': 'Customer Group',
    'addfield.profitability': 'Profitability',
};

export const addTranslations = update => {
    if (update) {
        translations = Object.assign({}, translations, update);
    }
};

export const lookup = key => {
    const translation = translations[key];
    if (translation) {
        return translation;
    } else {
        let newTranslation = {};
        newTranslation[key] = key;
        translations = Object.assign({}, translations, newTranslation);
        return key;
    }
};
export const reverseLookup = translation => {
    let result = translation;
    const FoundException = {};
    try {
        Object.keys(translations).forEach(function eachKey(key) {
            if (translations[key] === translation) {
                result = key;
                throw FoundException;
            }
        });
    } catch (e) {
        return result;
    }
    return result;
};

const headers = new Headers();
headers.append('Content-Type', 'application/json;charset=UTF-8');
addCsrfToken(headers);
/* eslint-disable */
const request = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Object.keys(translations)),
    credentials: 'include',
};
/* eslint-enable */
