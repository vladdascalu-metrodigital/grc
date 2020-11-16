export const BACKEND_API_CONTEXT = '/dunningemailmanagement/api';

export const HTTP_METHOD_NAME_POST = 'POST';
export const HTTP_METHOD_NAME_GET = 'GET';
export const HTTP_METHOD_NAME_PUT = 'PUT';
export const HTTP_METHOD_NAME_DELETE = 'DELETE';

export const STATE_KEY_CUSTOMERS_IN_GROUP = 'customersInGroup';
export const STATE_KEY_CUSTOMER_BASIC_INFO = 'customerBasicInfo';

export const VALIDATION_EMAIL_ERROR_ALREADY_DELETED = 'mrc.dunningemailmanagement.validation.alreadyDeleted';
export const VALIDATION_EMAIL_ERROR_ALL_ALREADY_DELETED = 'mrc.dunningemailmanagement.validation.allAlreadyDeleted';
export const VALIDATION_EMAIL_ERROR_ALREADY_VERIFIED = 'mrc.dunningemailmanagement.validation.alreadyVerified';
export const VALIDATION_EMAIL_ERROR_ALL_ALREADY_VERIFIED = 'mrc.dunningemailmanagement.validation.allAlreadyVerified';
export const VALIDATION_EMAIL_ERROR_INVALID = 'mrc.dunningemailmanagement.validation.invalid';

// status and error codes for saving email
export const WAITING_FOR_HANDLING = 'waitingForHandling';
export const CUSTOMER_IN_PENDING = 'customerInPending';
export const NO_CUSTOMER_CHANGED = 'noCustomerChanged';
export const UNKNOWN_ERROR = 'unknownError';
export const ERROR_CODES = [CUSTOMER_IN_PENDING, NO_CUSTOMER_CHANGED, UNKNOWN_ERROR];
