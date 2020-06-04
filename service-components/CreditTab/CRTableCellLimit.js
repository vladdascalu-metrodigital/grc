import React, { PureComponent } from 'react';
import classnames from 'classnames';
import MrcNumber from '../../MrcNumber';

import './CRTableCellLimit.scss';
import './CRTableCellTypoHighlight.scss';

export default class CRTableCellLimit extends PureComponent {
    render() {
        let { limit, exhausted, country, isGreen, isBlue } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer-limit-granted', {
            'mrc-ui-crtable-cell-highlight-color-green': isGreen,
            'mrc-ui-crtable-cell-highlight-color-blue': isBlue,
        });
        return (
            <div className="mrc-ui-crtable-cell-limit">
                {exhausted && (
                    <span className="mrc-ui-crtable-cell-customer-limit-exhausted">
                        <MrcNumber isCurrency country={country}>
                            {exhausted}
                        </MrcNumber>
                    </span>
                )}
                {exhausted && limit && ' / '}
                <span className={className}>
                    <MrcNumber isCurrency country={country}>
                        {limit}
                    </MrcNumber>
                </span>
            </div>
        );
    }
}
