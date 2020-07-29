import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { COUNTRY, CURRENCY, countryToCurrency } from '../Util/currencyCommons';

import './index.scss';

export { COUNTRY, CURRENCY, countryToCurrency };

export const TYPE = {
    LARGE: 'large',
    LARGE_BOLD: 'large-bold',
    SMALL: 'small',
    SMALLER: 'smaller',
};

export default class MrcCurrency extends PureComponent {
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

MrcCurrency.defaultProps = {
    country: COUNTRY.DE,
};

MrcCurrency.propTypes = {
    children: PropTypes.string,
    country: PropTypes.string,
    type: PropTypes.string,
};
