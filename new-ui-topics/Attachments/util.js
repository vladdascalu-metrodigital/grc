import { lookup } from '../../Util/translations';

const optionSeparator = '|';

export function getOptionValues(optionsStr, fieldLabel, withoutEmptyOption) {
    if (optionsStr === undefined || optionsStr === null || optionsStr.trim() === '') {
        return [];
    }
    if (withoutEmptyOption) {
        return [...optionsStr.split(optionSeparator).map((v) => [v, lookup(fieldLabel + '.' + v)])];
    }

    return [
        ['', lookup('mrc.forms.please_select')],
        ...optionsStr.split(optionSeparator).map((v) => [v, lookup(fieldLabel + '.' + v)]),
    ];
}
