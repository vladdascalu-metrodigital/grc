import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MrcDate from '../../MrcDate';
import MrcCurrency from '../../MrcCurrency';

import './CRLimitSetting.scss';

export default class CRLimitSetting extends PureComponent {
    render() {
        return (
            <div className="mrc-ui-cr-limit-setting">
                <MrcCurrency type="large-bold">4000</MrcCurrency>
                <br />
                <MrcCurrency type="small">1000</MrcCurrency>
                <br />
                <MrcDate type="small">2020-05-06</MrcDate>
            </div>
        );
    }
}

CRLimitSetting.propTypes = {
    limit: PropTypes.number,
    limitAfterExpiry: PropTypes.number,
    expiryDate: PropTypes.string,
};
