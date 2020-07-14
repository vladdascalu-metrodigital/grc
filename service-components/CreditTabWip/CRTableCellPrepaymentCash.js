import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './CRTableCellPrepaymentCash.scss';
import './CRTableCellTypoHighlight.scss';

export default class CRTableCellPrepaymentCash extends PureComponent {
    render() {
        let { name, isGreen, isBlue, isRed } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer-prepayment-cash', {
            'mrc-ui-crtable-cell-highlight-color-green': isGreen,
            'mrc-ui-crtable-cell-highlight-color-blue': isBlue,
            'mrc-ui-crtable-cell-highlight-color-red': isRed,
        });
        return <div className={className}>{name}</div>;
    }
}
