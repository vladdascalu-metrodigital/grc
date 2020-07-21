import { List } from 'immutable';
import * as _ from 'lodash';

export function isContractingStep(stepType) {
    return ['CONTRACT_SIGNING', 'CONTRACT_VALIDATION'].includes(stepType);
}

export function isStandardStep(stepType) {
    return ['FORWARD', 'APPROVE', 'CONTRACTING_LIGHT', 'CONTRACTING', 'PROVIDE_INFO'].includes(stepType);
}

export function dateFormatString() {
    const formatObj = new Intl.DateTimeFormat().formatToParts(new Date());
    return formatObj
        .map((obj) => {
            switch (obj.type) {
                case 'day':
                    return 'dd';
                case 'month':
                    return 'MM';
                case 'year':
                    return 'yyyy';
                default:
                    return obj.value;
            }
        })
        .join('');
}

export function placeholdersUploaded(approval) {
    return (
        _.isNil(approval.placeholders) ||
        List(approval.placeholders)
            .filter((ph) =>
                List(approval.attachments)
                    .filter((a) => !a.deleted && a.fileType == ph.fileType)
                    .isEmpty()
            )
            .isEmpty()
    );
}

export function allCreditDataValid(validities) {
    return Object.keys(validities).reduce((flag, custId) => {
        return validities[custId] && flag;
    }, true);
}

export function formatted(number) {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(number);
}
