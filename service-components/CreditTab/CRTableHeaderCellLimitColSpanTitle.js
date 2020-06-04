import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './CRTableHeaderCellLimitColSpanTitle.scss';
import './CRTableCellTypoHighlight.scss';

export default class CRTableHeaderCellLimitColSpanTitle extends PureComponent {
    render() {
        let { prefix, title, isGreen, isBlue } = this.props;
        let className = classnames('mrc-ui-crtable-header-cell-limit-colspan-title', {
            'mrc-ui-crtable-cell-highlight-color-green': isGreen,
            'mrc-ui-crtable-cell-highlight-color-blue': isBlue,
        });
        return (
            <div className="mrc-ui-crtable-header-cell-copspan-title">
                {prefix && <span className="mrc-ui-crtable-header-cell-limit-colspan-prefix">{prefix}</span>}
                {prefix && title && ' / '}
                <span className={className}>{title}</span>
            </div>
        );
    }
}
