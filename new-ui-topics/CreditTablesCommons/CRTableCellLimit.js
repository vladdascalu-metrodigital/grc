import React, { PureComponent } from 'react';
import classnames from 'classnames';
import MrcNumber from '../../MrcNumber';

import './CRTableCellLimit.scss';
import './CRTableCellTypoHighlight.scss';
import PropTypes from 'prop-types';

export default class CRTableCellLimit extends PureComponent {
    render() {
        let { limit, exhausted, showExhausted, country, color } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer-limit-granted', {
            'mrc-ui-crtable-cell-highlight-color-green': color === 'green',
            'mrc-ui-crtable-cell-highlight-color-blue': color === 'blue',
            'mrc-ui-crtable-cell-highlight-color-red': color === 'red',
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

CRTableCellLimit.propTypes = {
    limit: PropTypes.number,
    exhausted: PropTypes.number,
    showExhausted: PropTypes.bool,
    country: PropTypes.string,
    color: PropTypes.oneOf(['green', 'blue', 'red']),
};
