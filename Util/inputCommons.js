import { lookup } from './translations';

export const CHANGE_DELAY = 420;

export const STATUS = {
    INVALID: 'invalid',
};

export const MESSAGE = {
    PLEASE_SELECT: lookup('mrc.forms.please_select'),
    REQUIRED: lookup('mrc.forms.required'),
    TOO_LOW: lookup('mrc.forms.number_too_low'),
    TOO_HIGH: lookup('mrc.forms.number_too_high'),
    NO_INTEGER: lookup('mrc.forms.no_interger_number'),
    NO_NUMBER: lookup('mrc.forms.no_number'),
};
