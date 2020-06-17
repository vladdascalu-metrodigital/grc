import { lookup } from '../../Util/translations';
import DefinitionList from '../../DefinitionList';
import React from 'react';

export function addBlockingCodesWarnings(checkoutCheckCode, blockingReason, addCountryInKeyForWarning, countryCode) {
    const list = [];
    if (checkoutCheckCode !== undefined && checkoutCheckCode !== null) {
        list.push({
            term: 'mrc.checkoutCheckCode',
            description: lookup(
                'mrc.checkoutCheckCode.message.' +
                    (addCountryInKeyForWarning ? countryCode + '.' : '') +
                    checkoutCheckCode
            ),
        });
    }
    if (blockingReason !== undefined && blockingReason !== null) {
        list.push({
            term: 'mrc.blockingReason',
            description: lookup(
                'mrc.blockingReason.message.' + (addCountryInKeyForWarning ? countryCode + '.' : '') + blockingReason
            ),
        });
    }

    if (list.length > 0) {
        return <DefinitionList className={'mrc-block-list'} list={list} />;
    }

    return null;
}

export function evalAddCountryInKeyForWarning(countriesWithDifferentBlockingCodes, countryCode) {
    return countriesWithDifferentBlockingCodes && countriesWithDifferentBlockingCodes.includes(countryCode)
        ? true
        : false;
}
