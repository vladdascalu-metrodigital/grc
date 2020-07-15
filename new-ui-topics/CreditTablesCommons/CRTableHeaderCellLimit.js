import React, { PureComponent } from 'react';

import './CRTableHeaderCellLimit.scss';

export default class CRTableHeaderCellLimit extends PureComponent {
    render() {
        let { prefix, title } = this.props;
        return (
            <div className="mrc-ui-crtable-header-cell-limit">
                <span className="mrc-ui-crtable-header-cell-limit-prefix">{prefix}</span>
                <span> / </span>
                <span className="mrc-ui-crtable-header-cell-limit-title">{title}</span>
            </div>
        );
    }
}
