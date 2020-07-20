import React, { PureComponent } from 'react';
import classnames from 'classnames';
import MrcNumber from '../MrcNumber';

import './CRTableCellLimit.scss';
import './CRTableCellTypoHighlight.scss';

export default class CRTableCellLimit extends PureComponent {
    render() {
        let { limit, exhausted, showExhausted, country, isGreen, isBlue, isRed } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer-limit-granted', {
            'mrc-ui-crtable-cell-highlight-color-green': isGreen,
            'mrc-ui-crtable-cell-highlight-color-blue': isBlue,
            'mrc-ui-crtable-cell-highlight-color-red': isRed,
        });
        return (
            <div className="mrc-ui-crtable-cell-limit">
                {showExhausted && (exhausted || exhausted === 0) ? (
                    <span className="mrc-ui-crtable-cell-customer-limit-exhausted">
                        <MrcNumber isCurrency country={country}>
                            {exhausted}
                        </MrcNumber>
                    </span>
                ) : showExhausted === true ? (
                    '-'
                ) : null}
                {showExhausted === true ? ' / ' : null}
                {limit || limit === 0 ? (
                    <span className={className}>
                        <MrcNumber isCurrency country={country}>
                            {limit}
                        </MrcNumber>
                    </span>
                ) : (
                    '-'
                )}
            </div>
        );
    }
}
