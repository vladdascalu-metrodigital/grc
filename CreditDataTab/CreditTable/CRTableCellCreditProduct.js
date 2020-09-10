import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './CRTableCellCreditProduct.scss';
import './CRTableCellTypoHighlight.scss';
import PropTypes from 'prop-types';

export default class CRTableCellCreditProduct extends PureComponent {
    render() {
        let { productName, productTimePeriod, productPaymentMethod, warning, color } = this.props;
        let className = classnames('mrc-ui-crtable-cell-product-name', {
            'mrc-ui-crtable-cell-highlight-color-green': color === 'green',
            'mrc-ui-crtable-cell-highlight-color-blue': color === 'blue',
            'mrc-ui-crtable-cell-highlight-color-red': color === 'red',
        });
        return warning ? (
            <div className="mrc-ui-crtable-cell-credit-product">
                <div className={className}>{warning}</div>
                <div className="mrc-ui-crtable-cell-product-payment-method">{productName}</div>
                <div className="mrc-ui-crtable-cell-product-payment-method">{productTimePeriod}</div>
                <div className="mrc-ui-crtable-cell-product-payment-method">{productPaymentMethod}</div>
            </div>
        ) : (
            <div className="mrc-ui-crtable-cell-credit-product">
                <div className={className}>{productName}</div>
                <div className="mrc-ui-crtable-cell-product-time-period">{productTimePeriod}</div>
                <div className="mrc-ui-crtable-cell-product-payment-method">{productPaymentMethod}</div>
            </div>
        );
    }
}

CRTableCellCreditProduct.propTypes = {
    warning: PropTypes.string,
    productName: PropTypes.string,
    productTimePeriod: PropTypes.string,
    productPaymentMethod: PropTypes.string,
    color: PropTypes.oneOf(['green', 'blue', 'red']),
};
