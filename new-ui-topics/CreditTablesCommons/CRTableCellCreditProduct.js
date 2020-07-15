import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './CRTableCellCreditProduct.scss';
import './CRTableCellTypoHighlight.scss';

export default class CRTableCellCreditProduct extends PureComponent {
    render() {
        let { productName, productTimePeriod, productPaymentMethod, isBlue, isGreen } = this.props;
        let className = classnames('mrc-ui-crtable-cell-product-name', {
            'mrc-ui-crtable-cell-highlight-color-green': isGreen,
            'mrc-ui-crtable-cell-highlight-color-blue': isBlue,
        });
        return (
            <div className="mrc-ui-crtable-cell-credit-product">
                <div className={className}>{productName}</div>
                <div className="mrc-ui-crtable-cell-product-time-period">{productTimePeriod}</div>
                <div className="mrc-ui-crtable-cell-product-payment-method">{productPaymentMethod}</div>
            </div>
        );
    }
}
