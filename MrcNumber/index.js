import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { COUNTRY, CURRENCY, countryToCurrency } from '../Util/currencyCommons';

import './index.scss';

export { COUNTRY, CURRENCY, countryToCurrency };

export const TYPE = {
    SMALL: 'small',
    SMALLER: 'smaller',
};

export default class MrcNumber extends PureComponent {
    render() {
        let { isCurrency, country, locale, children: number, type } = this.props;
        number = typeof number === 'string' || typeof number === 'number' ? number.toString().trim() : '';
        if (isCurrency) {
            let options = {
                style: 'currency',
                currency: countryToCurrency[country.toUpperCase()] || CURRENCY.EUR,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            };
            number = new Intl.NumberFormat(locale, options).format(number);
        } else {
            number = new Intl.NumberFormat(locale, {}).format(number);
        }
        let className = classnames('mrc-ui-number', type && 'mrc-ui-number-' + type);

        return <span className={className}>{number}</span>;
    }
}

MrcNumber.defaultProps = {
    country: COUNTRY.DE,
};

MrcNumber.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    country: PropTypes.string,
    locale: PropTypes.string,
    isCurrency: PropTypes.bool,
    type: PropTypes.oneOf(['small', 'smaller']),
};
