import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export const COUNTRY = {
    DE: 'DE',
    ES: 'ES',
    PT: 'PT',
    AT: 'AT',
    PK: 'PK',
    PL: 'PL',
    RS: 'RS',
    HR: 'HR',
    RU: 'RU',
};

export const CURRENCY = {
    EUR: 'EUR',
    PKR: 'PKR',
    PLN: 'PLN',
    RSD: 'RSD',
    HRK: 'HRK',
    RUB: 'RUB',
};

export const countryToCurrency = {
    DE: CURRENCY.EUR,
    ES: CURRENCY.EUR,
    PT: CURRENCY.EUR,
    AT: CURRENCY.EUR,
    PK: CURRENCY.PKR,
    PL: CURRENCY.PLN,
    RS: CURRENCY.RSD,
    HR: CURRENCY.HRK,
    RU: CURRENCY.RUB,
};

export default class MrcCurrencySymbol extends PureComponent {
    render() {
        let className = classnames(
            'mrc-ui-currency-symbol',
            this.props.type === 'small' && 'mrc-ui-currency-symbol-small'
        );
        return <span className={className}>{countryToCurrency[this.props.country]}</span>;
    }
}

MrcCurrencySymbol.defaultProps = {
    country: COUNTRY.DE,
};

MrcCurrencySymbol.propTypes = {
    country: PropTypes.string,
    type: PropTypes.oneOf(['small']),
};
