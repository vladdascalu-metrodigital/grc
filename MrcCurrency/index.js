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

export const TYPE = {
    LARGE: 'large',
    LARGE_BOLD: 'large-bold',
    SMALL: 'small',
    SMALLER: 'smaller',
};

// export const COLOR = {
//     CONTRAST_WHITE: 'white',
//     CONTRAST_BLACK: 'black',
//     INTERACTION: 'interaction',
//     SUCCESS: 'success',
//     NEUTRAL: 'neutral',
//     DANGER: 'danger',
//     ATTENTION: 'attention',
//     LIGHT_RED: 'light-red',
// };

export default class MrcNumber extends PureComponent {
    render() {
        let { country, children: number, type } = this.props;

        let options = {
            style: 'currency',
            currency: countryToCurrency[country.toUpperCase()] || CURRENCY.EUR,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        };
        let numberParts = new Intl.NumberFormat(undefined, options).formatToParts(number);
        let className = classnames('mrc-ui-currency', type && 'mrc-ui-currency-' + type);
        return (
            <span className={className}>
                {numberParts.map(({ type, value }, i) => {
                    switch (type) {
                        case 'currency':
                            return (
                                <span key={i} className="mrc-ui-currency-symb">
                                    {countryToCurrency[country]}
                                </span>
                            );
                        default:
                            return value;
                    }
                })}
            </span>
        );
    }
}

MrcNumber.defaultProps = {
    country: COUNTRY.DE,
};

MrcNumber.propTypes = {
    children: PropTypes.string,
    country: PropTypes.string,
    type: PropTypes.string,
};
