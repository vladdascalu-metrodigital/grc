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
    'mrc.customerdetails.fields.registration': 'Registration',
    'mrc.customerdetails.fields.legalformdescription': 'Legal Form Description',
    'mrc.attachments.fields.contract.start_date': 'Start Date',
    'mrc.attachments.showDeletedAttachments': 'Show Deleted Attachments',
    'mrc.customerdata.name': 'Customer Name',

    'mrc.blockingReason.message.2': 'Card misuse by customer',
    'mrc.blockingReason.message.9': 'Inactive customer',
    'mrc.blockingReason.message.ES.9': 'Cliente inactiva',
    'mrc.checkoutCheckCode.message.30': 'Credit block',
    'mrc.checkoutCheckCode.message.ES.30': 'Bloque de crédito',
    'mrc.customerdata.title': 'Customer',

    'mrc.customerdata.blocked': 'Blocked Customer',
    'mrc.customerdata.contactInfo': 'Contact Info',
    'mrc.customerdata.businessInfo': 'Business Info',
    'mrc.customerdetails.fields.branch': 'Branch',

    'mrc.creditdata.current': 'Current',
    'mrc.credittab.pick': 'Pick',
    'mrc.credittab.expiry': 'Expiry',
    'mrc.credittab.granted': 'Granted',
    'mrc.credittab.exhausted': 'Exhausted',
    'mrc.credittab.limit': 'Limit',
    'mrc.creditdetails.creditproduct': 'Credit Product',
    'mrc.creditdetails.creditperiod': 'Credit Period',
    'mrc.creditdetails.limitExpiryDate': 'Limit Expiry Date',
    'mrc.credittab.new': 'New',
    'mrc.credittab.old': 'Old',
    'mrc.credittab.toBeGranted': 'To be granted',
    'mrc.credittab.newlyGranted': 'Newly granted',
    'mrc.credittab.customerWish': 'Customer Wish',
    'mrc.credittab.customergroup': 'Customer Group',
    'mrc.credittab.days': 'Days',
    'addfield.profitability': 'Profitability',
    'mrc.credittab.choosepayment': 'Choose Payment',
    'mrc.credittab.chooseamount': 'Choose Amount',
    'mrc.credittab.chooselimit': 'Choose new Limit',
    'mrc.credittab.chooseproduct': 'Choose Creditproduct',
    'mrc.credittab.chooseexpiry': 'Choose Expiry',
    'mrc.credittab.choosedebittype': 'Choose Debit Type',
    'mrc.credittab.choosepaymentmethod': 'Choose Payment Method',
    'mrc.credittab.choosenewpaymentmethod': 'Choose new payment method',
    'mrc.credittab.cash': 'Cash',
    'mrc.credittab.payment': 'Payment',
    'mrc.credittab.paymentmethod': 'Payment Method',
    'mrc.creditdata.title': 'Credit',
    'mrc.credittab.withoutExpiry': 'Without Expiry',
    'mrc.credittab.groupdetails': 'Group Details',
    'mrc.credittab.requestdetails': 'Request Details',
    'mrc.credittab.setExpiryDateForAll': 'Set date of expiry to all customers limits',
    'mrc.credittab.resetLimit': 'Set limit after expiry to',
    'mrc.credittab.additionalFieldsEdit': 'Edit',
    'mrc.credittab.creditprogramEdit': 'Edit',

    'mrc.payment.Prepayment': 'Prepayment',
    'mrc.payment.METRO_Cash': 'Metro Cash',
    'mrc.payment.Firmenlastschriftmandat': 'Firmenlastschriftmandat',
    'mrc.payment.Basislastschriftmandat': 'Basislastschriftmandat',
    'mrc.payment.Mitte_und_Ende_des_Monats': 'Mitte und Ende des Monats',
    'mrc.payment.Mitte_des_Monats': 'Mitte des Monats',
    'mrc.payment.Ende_des_Monats': 'Ende des Monats',
    'mrc.payment.1': '1',
    'mrc.payment.2': '2',
    'mrc.payment.3': '3',
    'mrc.payment.4': '4',
    'mrc.payment.5': '5',
    'mrc.payment.6': '6',
    'mrc.payment.7': '7',
    'mrc.payment.8': '8',
    'mrc.payment.9': '9',
    'mrc.payment.10': '10',
    'mrc.payment.11': '11',
    'mrc.payment.12': '12',
    'mrc.payment.13': '13',
    'mrc.payment.14': '14',
    'mrc.payment.15': '15',
    'mrc.payment.16': '16',
    'mrc.payment.17': '17',
    'mrc.payment.18': '18',
    'mrc.payment.19': '19',
    'mrc.payment.20': '20',
    'mrc.payment.21': '21',
    'mrc.payment.22': '22',
    'mrc.payment.23': '23',
    'mrc.payment.24': '24',
    'mrc.payment.25': '25',
    'mrc.payment.26': '26',
    'mrc.payment.27': '27',
    'mrc.payment.28': '28',
    'mrc.payment.29': '29',
    'mrc.payment.30': '30',
    'mrc.payment.31': '31',
    'mrc.payment.32': '32',
    'mrc.payment.33': '33',
    'mrc.payment.34': '34',
    'mrc.payment.35': '35',
    'mrc.payment.36': '36',
    'mrc.payment.37': '37',
    'mrc.payment.38': '38',
    'mrc.payment.39': '39',
    'mrc.payment.40': '40',
    'mrc.payment.41': '41',
    'mrc.payment.42': '42',
    'mrc.payment.43': '43',
    'mrc.payment.44': '44',
    'mrc.payment.45': '45',
    'mrc.payment.46': '46',
    'mrc.payment.47': '47',
    'mrc.payment.48': '48',
    'mrc.payment.49': '49',
    'mrc.payment.50': '50',
    'mrc.payment.51': '51',
    'mrc.payment.52': '52',
    'mrc.payment.53': '53',
    'mrc.payment.54': '54',
    'mrc.payment.55': '55',
    'mrc.payment.56': '56',
    'mrc.payment.57': '57',
    'mrc.payment.58': '58',
    'mrc.payment.59': '59',
    'mrc.payment.60': '60',
};

export const addTranslations = (update) => {
    if (update) {
        translations = Object.assign({}, translations, update);
    }
};

export const lookup = (key) => {
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

// for some languages plural form is a bit tricky e.g. for RU
export const numberDependentLookup = (numberValue, key) => {
    if (numberValue === 1) {
        return lookup(key);
    } else if (
        numberValue % 10 === 0 ||
        (numberValue % 100 >= 5 && numberValue % 100 <= 20) ||
        (numberValue % 10 >= 5 && numberValue % 10 <= 9)
    ) {
        return lookup(key + 's');
    } else if (numberValue % 10 >= 2 && numberValue % 10 <= 4) {
        return lookup(key + 's.2');
    } else {
        return lookup(key + 's.1');
    }
};

export const reverseLookup = (translation) => {
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
