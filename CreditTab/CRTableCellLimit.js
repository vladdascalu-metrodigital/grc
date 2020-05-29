import React, { PureComponent } from 'react';

export default class CRTableCellLimit extends PureComponent {
    render() {
        let { limit, exhausted } = this.props;
        return (
            <div className="mrc-ui-crtable-cell-limit">
                {exhausted && <span>{exhausted}</span>}
                <em>{limit}</em>
            </div>
        );
    }
}
