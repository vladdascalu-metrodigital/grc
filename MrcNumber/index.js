import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { COUNTRY, CURRENCY, countryToCurrency } from '../Util/currencyCommons';

import './index.scss';
import * as _ from 'lodash';

export { COUNTRY, CURRENCY, countryToCurrency };

export const TYPE = {
    SMALL: 'small',
    SMALLER: 'smaller',
};

export default class MrcNumber extends PureComponent {
    render() {
        let { isCurrency, isPercentage, country, locale, children: number, type } = this.props;
        number = typeof number === 'string' || typeof number === 'number' ? number.toString().trim() : '';
        const suffix = isPercentage ? '%' : '';
        if (isCurrency) {
            const currency = _.isNil(country) ? CURRENCY.EUR : countryToCurrency[country.toUpperCase()] || CURRENCY.EUR;
            let options = {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            };
            number = new Intl.NumberFormat(locale, options).format(number);
        } else if (isPercentage) {
            number = new Intl.NumberFormat(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(
                number
            );
        } else {
            number = new Intl.NumberFormat(locale, {}).format(number);
        }
        let className = classnames('mrc-ui-number', type && 'mrc-ui-number-' + type);

        return (
            <span className={className}>
                {number}
                {suffix}
            </span>
        );
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
    isPercentage: PropTypes.bool,
    type: PropTypes.oneOf(['small', 'smaller']),
};
