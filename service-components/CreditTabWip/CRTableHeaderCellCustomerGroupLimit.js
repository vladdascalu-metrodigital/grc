import React, { PureComponent } from 'react';
import classnames from 'classnames';
import MrcNumber from '../../MrcNumber';

import './CRTableCellTypoHighlight.scss';
import './CRTableHeaderCellCustomerGroupLimit.scss';

export default class CRTableHeaderCellCustomerGroupLimit extends PureComponent {
    render() {
        let { limit, exhausted, country, subtitle, isGreen, isBlue, inSameRow } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer-group-limit-granted', {
            'mrc-ui-crtable-cell-highlight-color-green': isGreen,
            'mrc-ui-crtable-cell-highlight-color-blue': isBlue,
        });
        return (
            <div className="mrc-ui-crtable-cell-group-limit">
                {exhausted || exhausted === 0 ? (
                    <span className="mrc-ui-crtable-cell-customer-group-limit-exhausted">
                        <MrcNumber isCurrency country={country}>
                            {exhausted || exhausted === 0 ? exhausted : ''}
                        </MrcNumber>
                    </span>
                ) : null}
                {(exhausted || exhausted === 0) && (limit || limit === 0) && ' / '}
                <span className={className}>
                    <MrcNumber isCurrency country={country}>
                        {limit || limit === 0 ? limit : ''}
                    </MrcNumber>
                </span>
                {inSameRow ? (
                    <span className="mrc-ui-crtable-cell-customer-group-limit-subtitle mrc-ui-crtable-cell-customer-group-limit-subtitle-samerow">
                        {subtitle}
                    </span>
                ) : (
                    <div className="mrc-ui-crtable-cell-customer-group-limit-subtitle">{subtitle}</div>
                )}
            </div>
        );
    }
}
