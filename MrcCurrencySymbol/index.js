import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { COUNTRY, CURRENCY, countryToCurrency } from '../Util/currencyCommons';

import './index.scss';

export { COUNTRY, CURRENCY, countryToCurrency };

export const TYPE = {
    SMALL: 'small',
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
