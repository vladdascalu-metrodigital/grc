import React, { PureComponent } from 'react';
import classnames from 'classnames';
import MrcNumber from '../MrcNumber';
import MrcDate from '../MrcDate';
import './CRTableCellExpiry.scss';
import './CRTableCellTypoHighlight.scss';

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
                    <MrcNumber isCurrency>{expiryLimit}</MrcNumber>
                </div>
                <div className="mrc-ui-crtable-cell-expiry-date">
                    <MrcDate>{expiryDate}</MrcDate>
                </div>
            </div>
        );
    }
}
