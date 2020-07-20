import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './CRPaymentMethodSetting.scss';

export default class CRPaymentMethodSetting extends PureComponent {
    render() {
        let { product, period, directDebit } = this.props;
        return (
            <div className="mrc-ui-cr-payment-method-setting">
                <div className="mrc-ui-check-card-product">{product}</div>
                <div>{period}</div>
                {directDebit && <div>{directDebit}</div>}
            </div>
        );
    }
}

CRPaymentMethodSetting.propTypes = {
    product: PropTypes.string,
    period: PropTypes.string,
    directDebit: PropTypes.string,
};
