import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './CRTableHeaderCellTitle.scss';
import './CRTableCellTypoHighlight.scss';

export default class CTableHeaderCellTitle extends PureComponent {
    render() {
        let { prefix, title, color } = this.props;
        let highlightClassName = classnames({
            'mrc-ui-crtable-cell-highlight-color-green': color === 'green',
            'mrc-ui-crtable-cell-highlight-color-blue': color === 'blue',
            'mrc-ui-crtable-cell-highlight-color-red': color === 'red',
        });
        return (
            <div className="mrc-ui-crtable-header-cell-title">
                {prefix && (
                    <span className="mrc-ui-crtable-header-cell-title-prefix">
                        {prefix}
                        {prefix && title && ' / '}
                    </span>
                )}
                <span className={highlightClassName}>{title}</span>
            </div>
        );
    }
}

CTableHeaderCellTitle.propTypes = {
    prefix: PropTypes.string,
    title: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['green', 'blue']),
};
