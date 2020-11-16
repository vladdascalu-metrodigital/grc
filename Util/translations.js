import { addCsrfToken } from './csrf';

// Changing these translations might affect testing
let translations = {
    'cluster.id.': ' ',

    'mrc.apply': 'Apply',
    'mrc.cancel': 'Cancel',

    'mrc.apps.inbox': 'Inbox',
    'mrc.apps.history': 'History',
    'mrc.apps.language': 'language',
    'mrc.apps.launchpad': 'Launchpad',
    'mrc.apps.prepayment': 'Prepayment',
    'mrc.apps.quickcheck': 'Quick Check',
    'mrc.apps.limitcheck': 'Limit Check',
    'mrc.apps.batchupdate': 'Batch Update',
    'mrc.apps.reports': 'Reporting',
    'mrc.apps.creditcorrection': 'Credit Correction',
    'mrc.apps.dunningemailmanagement': 'Dunning Email Management',

    'mrc.forms.please_select': 'Please Select ...',
    'mrc.forms.required': 'Data is requiered',
    'mrc.forms.requiredNumber': 'required is valid number',

    'mrc.reports.title': 'Available Reports',
    'mrc.file.select': 'SELECT FILE',
    'mrc.file.upload': 'UPLOAD FILE',
    'mrc.attachments.title': 'Attachments',
    'mrc.attachments.fields.title': 'Title',
    'mrc.attachments.fields.file': 'Selected file',
    'mrc.attachments.noattachments': 'No Attachments',
    'mrc.attachments.unknown-mime': 'Unknown',
    'mrc.attachments.delete': 'Delete',
    'mrc.attachments.addbutton': 'Add attachment',
    'mrc.attachments.modaltitle': 'Add Attachment',
    'mrc.attachments.fields.fileType': 'File Type',
    'mrc.attachments.choose': 'Please Choose...',
    'mrc.attachments.types.general': 'General',

    'mrc.fileUpload.chooseFile': 'Choose files',
    'mrc.fileUpload.uploadOrDropThemHere': 'to upload or drop them here.',
    'mrc.attachments.addPlaceholder': 'Add Placeholder',

    'mrc.attachments.amount': 'Amount',
    'mrc.attachments.expiry': 'expiry',
    'mrc.attachments.missing': 'missing',
    'mrc.attachments.types.contract': 'Contract',
    'mrc.attachments.types.bond': 'Bond',
    'mrc.attachments.types.delkredere': 'Delkredere',
    'mrc.attachments.headline': 'Attachments',
    'mrc.attachments.contractlinktext': 'Contract Templates',

    'mrc.attachments.types.cec_avalizat_banca': 'CEC avalizat de banca',
    'mrc.attachments.types.scrisoare_garantie_bancara': 'Scrisoare de Garantie Bancara',
    'mrc.attachments.fields.generic.amount': 'Amount',
    'mrc.attachments.fields.generic.validity_date': 'Validity Date',

    'mrc.attachments.fields.contract.expiration_date': 'Expiration Date',
    'mrc.attachments.fields.contract.contract_id': 'Contract ID',
    'mrc.attachments.fields.contract.type_of_contract': 'Type of contract',
    'mrc.attachments.fields.contract.cma_request_id': 'CMA request ID',
    'mrc.attachments.fields.contract.cma_request_date': 'CMA request date',

    'mrc.attachments.fields.contract.type.RO.option.C_and_C_5_days_CEC': 'Contract C&C- plata 5 zile - fila CEC',
    'mrc.attachments.fields.contract.type.RO.option.C_and_C_TF': 'Contract C&C_TF',
    'mrc.attachments.fields.contract.type.RO.option.C_and_C_TM': 'Contract C&C_TM',
    'mrc.attachments.fields.contract.type.RO.option.D_C_and_C_TF': 'Contract D_C&C_TF',
    'mrc.attachments.fields.contract.type.RO.option.D_C_and_C_TM': 'Contract D_C&C_TM',
    'mrc.attachments.fields.contract.type.RO.option.TD': 'Contract TD',

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
    'mrc.credittab.missingvalue': 'Value is missing',
    'mrc.credittab.selectedcreditprogram': 'Selected credit program',

    'mrc.dunningemailmanagement.table.customer': 'Customer',
    'mrc.dunningemailmanagement.table.status': 'Status',
    'mrc.dunningemailmanagement.table.dunningEmail': 'Dunning Email',
    'mrc.dunningemailmanagement.table.action': 'Action',

    'mrc.dunningemailmanagement.button.edit': 'Edit',
    'mrc.dunningemailmanagement.button.cancel': 'Cancel',
    'mrc.dunningemailmanagement.button.editSelection': 'Edit Selection',
    'mrc.dunningemailmanagement.button.save': 'Save And Verify',
    'mrc.dunningemailmanagement.button.delete': 'Delete',

    'mrc.dunningemailmanagement.status.ALL': 'All Status',
    'mrc.dunningemailmanagement.status.DOMAIN_VERIFIED': 'Domain Verified',
    'mrc.dunningemailmanagement.status.UNVERIFIED': 'Unverified',
    'mrc.dunningemailmanagement.status.NO_DUNNING_EMAIL': 'No Dunning Email',

    'mrc.dunningemailmanagement.noActiveCustomer': 'No active customers in group!',
    'mrc.dunningemailmanagement.searchCustomerPlaceHolder': 'Search by Id, Name...',
    'mrc.dunningemailmanagement.searchClearText': 'clear',
    'mrc.dunningemailmanagement.customerGroupInfo': ' active Customers in Customer Group',

    'mrc.dunningemailmanagement.editSingleDialogTitle': 'Select E-Mail',
    'mrc.dunningemailmanagement.editSelectionDialogTitle': 'Edit E-Mail',
    'mrc.dunningemailmanagement.emailLabel': 'E-Mail',
    'mrc.dunningemailmanagement.searchEmailPlaceHolder': 'Type Email',
    'mrc.dunningemailmanagement.newEmailLabel': 'E-Mail',
    'mrc.dunningemailmanagement.dunningEmailLabel': 'Dunning Email',
    'mrc.dunningemailmanagement.otherEmailLabel': 'Other Email',

    'mrc.dunningemailmanagement.editStatus.waitingForHandling': 'Waiting for handling dunning email change',
    'mrc.dunningemailmanagement.editStatus.customerInPending':
        'Last dunning email change of customer is still in progress, please try it later',
    'mrc.dunningemailmanagement.editStatus.noCustomerChanged': 'No customer can be changed, please try it later',
    'mrc.dunningemailmanagement.editStatus.unknownError':
        'Failed to change dunning email, please try it later or contact mrc team',
    'mrc.dunningemailmanagement.editStatus.updateSuccessfully': 'Dunning email is changed successfully',

    'mrc.dunningemailmanagement.validation.alreadyDeleted': 'Dunning email of this customer was already deleted',
    'mrc.dunningemailmanagement.validation.allAlreadyDeleted':
        'Dunning emails of all selected customers were already deleted',
    'mrc.dunningemailmanagement.validation.alreadyVerified': 'Dunning email of this customer was already verified',
    'mrc.dunningemailmanagement.validation.allAlreadyVerified':
        'Dunning emails of all selected customers were all verified',
    'mrc.dunningemailmanagement.validation.invalid': 'Email is invalid',

    'mrc.dunningemailmanagement.error.search': 'Failed to search customer',
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
