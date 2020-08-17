import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import MrcDate from '../../MrcDate';
// import { COLOR as IC} from '../../icons/index';
// import RocketIcon from '../../icons/RocketIcon';

import HeaderInfoRequestStart, { headerInfoRequestStartDataPropType } from './HeaderInfoRequestStart';
import HeaderInfoRequestSummary, {
    HeaderInfoRequestSummaryDataPropType,
    STATUS as RSTATUS,
} from './HeaderInfoRequestSummary';
import HeaderInfoLimits, { headerInfoLimitsDataPropType, LIMIT_DIR } from './HeaderInfoLimits';
import HeaderInfoPaymentTerm, { headerInfoPaymentTermDataPropType } from './HeaderInfoPaymentTerm';

import './HeaderInfo.scss';

export default class HeaderInfos extends PureComponent {
    render() {
        let { requestStartDate, isColStyle } = this.props;
        let className = classnames('mrc-ui-header-info', {
            'mrc-ui-header-info-row-style': !isColStyle,
            'mrc-ui-header-info-col-style': isColStyle,
        });
        return (
            <div className={className}>
                <HeaderInfoRequestStart isColStyle={isColStyle} requestStartDate={requestStartDate} />
                <HeaderInfoRequestSummary
                    isColStyle={isColStyle}
                    phaseName="Initialisierung"
                    phaseNumber="1"
                    phaseNumberMax="5"
                    status={RSTATUS.PENDING}
                    statusRole="HOT"
                />
                <HeaderInfoLimits
                    isColStyle={isColStyle}
                    limitType={'NEW LIMIT'}
                    groupLimit={20400}
                    groupLimitDirection={LIMIT_DIR.UP}
                    customerLimit={13055}
                    customerLimitDirection={LIMIT_DIR.EQUAL}
                    country={'DE'}
                />
                {isColStyle && (
                    <HeaderInfoPaymentTerm
                        isColStyle={isColStyle}
                        creditPeriod={14}
                        creditProduct="METRO Top blaaa bluppp mega lang usw..."
                        mandate="mandate xyz"
                    />
                )}
            </div>
        );
    }
}

export const headerInfoDataPropType = {
    ...headerInfoRequestStartDataPropType,
    ...HeaderInfoRequestSummaryDataPropType,
    ...headerInfoLimitsDataPropType,
    ...headerInfoPaymentTermDataPropType,
};

HeaderInfos.propTypes = {
    isColStyle: PropTypes.bool,
    ...headerInfoDataPropType,
};
