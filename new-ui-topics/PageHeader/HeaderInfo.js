import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

// import MrcDate from '../../MrcDate';
// import { COLOR as IC} from '../../icons/index';
// import RocketIcon from '../../icons/RocketIcon';

import HeaderInfoRequestStart, { headerInfoRequestStartDataPropType } from './HeaderInfoRequestStart';
import HeaderInfoRequestSummary, { HeaderInfoRequestSummaryDataPropType } from './HeaderInfoRequestSummary';

import './HeaderInfo.scss';

export default class HeaderInfos extends PureComponent {
    render() {
        let { requestStartDate, isColStyle } = this.props;
        return (
            <div className={'mrc-ui-header-info'}>
                <HeaderInfoRequestStart requestStartDate={requestStartDate} isColStyle={isColStyle} />
                <HeaderInfoRequestSummary />
            </div>
        );
    }
}

export const headerInfoDataPropType = {
    ...headerInfoRequestStartDataPropType,
    ...HeaderInfoRequestSummaryDataPropType,
};

HeaderInfos.propTypes = {
    isColStyle: PropTypes.bool,
    ...headerInfoDataPropType,
};
