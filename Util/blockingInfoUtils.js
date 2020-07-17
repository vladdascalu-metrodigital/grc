import * as _ from 'lodash';
import { lookup } from './translations';

export const createBlockingInfo = (countriesWithDifferentBlockingCodes, blockingReason, checkoutCheckCode, country) => {
    const isCustomerBlocked = !_.isNil(blockingReason) || !_.isNil(checkoutCheckCode);
    if (!isCustomerBlocked) {
        return {
            isBlocked: false,
            blockingReasonText: undefined,
            checkoutCheckCodeText: undefined,
        };
    }

    const msgKeyPartCountry =
        country &&
        countriesWithDifferentBlockingCodes &&
        countriesWithDifferentBlockingCodes.length > 0 &&
        countriesWithDifferentBlockingCodes.includes(country)
            ? country + '.'
            : '';
    const blockingReasonText = !_.isNil(blockingReason)
        ? lookup('mrc.blockingReason') +
          ': ' +
          lookup('mrc.blockingReason.message.' + msgKeyPartCountry + blockingReason)
        : null;
    const checkoutCheckCodeText = !_.isNil(checkoutCheckCode)
        ? lookup('mrc.checkoutCheckCode') +
          ': ' +
          lookup('mrc.checkoutCheckCode.message.' + msgKeyPartCountry + checkoutCheckCode)
        : null;

    return {
        isBlocked: isCustomerBlocked,
        blockingReasonText: blockingReasonText,
        checkoutCheckCodeText: checkoutCheckCodeText,
    };
};
