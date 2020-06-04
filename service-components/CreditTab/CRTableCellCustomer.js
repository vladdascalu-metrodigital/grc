import React, { PureComponent } from 'react';
import classnames from 'classnames';

import CheckmarkFilledIcon from '../../icons/CheckmarkFilledIcon';
import { SIZE as ISIZE } from '../../icons/index';

import './CRTableCellCustomer.scss';

export default class CRTableCellCustomer extends PureComponent {
    render() {
        let { number, name, isBlocked, isHighlighted } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer', {
            'mrc-ui-crtable-cell-customer-highlighted': isHighlighted,
        });
        return (
            <div className={className}>
                <CheckmarkFilledIcon size={ISIZE.SMALL} />
                <div>
                    <span>{number}</span>
                    <span className="mrc-ui-crtable-cell-customer-name">{name}</span>
                    {isBlocked && <span className="mrc-ui-crtable-cell-customer-blocked">Kundensperre</span>}
                </div>
            </div>
        );
    }
}
