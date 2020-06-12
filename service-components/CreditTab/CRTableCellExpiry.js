import React, { PureComponent } from 'react';
import classnames from 'classnames';
import MrcNumber from '../../MrcNumber';
import MrcDate from '../../MrcDate';
import './CRTableCellExpiry.scss';
import './CRTableCellTypoHighlight.scss';

import * as _ from 'lodash';

export default class CRTableCellExpiry extends PureComponent {
    render() {
        let { expiryLimit, expiryDate, isGreen, isBlue } = this.props;
        let className = classnames('mrc-ui-crtable-cell-expiry-limit', {
            'mrc-ui-crtable-cell-highlight-color-green': isGreen,
            'mrc-ui-crtable-cell-highlight-color-blue': isBlue,
        });

        return (
            <div className="mrc-ui-crtable-cell-expiry">
                <div className={className}>
                    {!_.isNil(expiryLimit) ? <MrcNumber isCurrency>{expiryLimit}</MrcNumber> : '-'}
                </div>
                <div className="mrc-ui-crtable-cell-expiry-date">
                    {!_.isNil(expiryLimit) ? <MrcDate>{expiryDate}</MrcDate> : null}
                </div>
            </div>
        );
    }
}
