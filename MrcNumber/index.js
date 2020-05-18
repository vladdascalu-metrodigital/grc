import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const COUNTRY = {
    DE: 'DE',
    ES: 'ES',
    PT: 'PT',
    AT: 'AT',
    PK: 'PK',
    PL: 'PL',
    RS: 'RS',
    HR: 'HR',
};

export const CURRENCY = {
    EUR: 'EUR',
    PKR: 'PKR',
    PLN: 'PLN',
    RSD: 'RSD',
    HRK: 'HRK',
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
};

export default class MrcNumber extends PureComponent {
    render() {
        let { isCurrency, country, children: number } = this.props;

        if (isCurrency) {
            let options = {
                style: 'currency',
                currency: countryToCurrency[country.toUpperCase()] || CURRENCY.EUR,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            };
            number = new Intl.NumberFormat(undefined, options).format(number);
        }

        return <span className="mrc-ui-number">{number}</span>;
    }
}

MrcNumber.defaultProps = {
    country: COUNTRY.DE,
};

MrcNumber.propTypes = {
    children: PropTypes.string,
    country: PropTypes.string,
    isCurrency: PropTypes.bool,
};
