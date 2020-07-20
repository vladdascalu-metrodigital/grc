import React, { PureComponent } from 'react';
import classnames from 'classnames';
import MrcNumber from '../../MrcNumber';

import './CRTableCellTypoHighlight.scss';
import './CRTableHeaderCellCustomerGroupLimit.scss';
import PropTypes from 'prop-types';

export default class CRTableHeaderCellCustomerGroupLimit extends PureComponent {
    render() {
        let { limit, exhausted, showExhausted, country, subtitle, color, inSameRow } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer-group-limit-granted', {
            'mrc-ui-crtable-cell-highlight-color-green': color === 'green',
            'mrc-ui-crtable-cell-highlight-color-blue': color === 'blue',
            'mrc-ui-crtable-cell-highlight-color-red': color === 'red',
        });
        return (
            <div className="mrc-ui-crtable-cell-group-limit">
                {showExhausted && (exhausted || exhausted === 0) ? (
                    <span className="mrc-ui-crtable-cell-customer-group-limit-exhausted">
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

CRTableHeaderCellCustomerGroupLimit.propTypes = {
    limit: PropTypes.number,
    exhausted: PropTypes.number,
    showExhausted: PropTypes.bool,
    country: PropTypes.string,
    subtitle: PropTypes.string,
    color: PropTypes.oneOf(['green', 'blue', 'red']),
    inSameRow: PropTypes.bool,
};
