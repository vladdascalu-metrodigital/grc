import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MrcDate from '../../MrcDate';
import MrcCurrency from '../../MrcCurrency';
import * as _ from 'lodash';

import './CRLimitSetting.scss';

export default class CRLimitSetting extends PureComponent {
    render() {
        let { limit, limitAfterExpiry, expiryDate } = this.props;
        return (
            <div className="mrc-ui-cr-limit-setting">
                {!_.isNil(limit) ? <MrcCurrency type="large-bold">{limit}</MrcCurrency> : null}
                <br />
                {limitAfterExpiry || limitAfterExpiry === 0 ? (
                    <MrcCurrency type="small">{limitAfterExpiry}</MrcCurrency>
                ) : null}
                <br />
                {expiryDate ? <MrcDate type="small">{expiryDate}</MrcDate> : null}
            </div>
        );
    }
}

CRLimitSetting.propTypes = {
    limit: PropTypes.number,
    limitAfterExpiry: PropTypes.number,
    expiryDate: PropTypes.string,
};
