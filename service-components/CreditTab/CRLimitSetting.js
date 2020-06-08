import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MrcDate from '../../MrcDate';
import MrcCurrency from '../../MrcCurrency';

import './CRLimitSetting.scss';

export default class CRLimitSetting extends PureComponent {
    render() {
        let { limit, limitAfterExpiry, expiryDate } = this.props;
        return (
            <div className="mrc-ui-cr-limit-setting">
                <MrcCurrency type="large-bold">{limit}</MrcCurrency>
                <br />
                <MrcCurrency type="small">{limitAfterExpiry}</MrcCurrency>
                <br />
                <MrcDate type="small">{expiryDate}</MrcDate>
            </div>
        );
    }
}

CRLimitSetting.propTypes = {
    limit: PropTypes.number,
    limitAfterExpiry: PropTypes.number,
    expiryDate: PropTypes.string,
};
