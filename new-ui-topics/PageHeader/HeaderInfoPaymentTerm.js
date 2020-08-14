import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './HeaderInfoPaymentTerm.scss';

export default class HeaderInfoPaymentTerm extends PureComponent {
    render() {
        let { isColStyle, mandate, creditProduct, creditPeriod } = this.props;
        let className = classnames('mrc-ui-hi-payment-term', {
            'mrc-ui-hi-payment-term-colstyle': isColStyle,
        });
        return (
            <div className={className}>
                <div className="mrc-ui-hi-payment-term-title">Payment Method</div>
                <div className="mrc-ui-hi-payment-term-product">
                    <span>Credit Product</span>
                    <span>{creditProduct}</span>
                </div>
                <div className="mrc-ui-hi-payment-term-period">
                    <span>Credit Period</span>
                    <span>{creditPeriod}</span>
                </div>
                <div className="mrc-ui-hi-payment-term-mandate">
                    <span>Credit Period</span>
                    <span>{mandate}</span>
                </div>
            </div>
        );
    }
}

export const headerInfoPaymentTermDataPropType = {
    mandate: PropTypes.string,
    creditProduct: PropTypes.string,
    creditPeriod: PropTypes.number,
};

HeaderInfoPaymentTerm.propTypes = {
    isColStyle: PropTypes.bool,
    ...headerInfoPaymentTermDataPropType,
};
