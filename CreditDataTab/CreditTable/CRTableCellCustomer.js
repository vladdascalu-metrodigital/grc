import React, { PureComponent } from 'react';
import classnames from 'classnames';
import CheckmarkFilledIcon from '../../icons/CheckmarkFilledIcon';
import WarningSmallFilledIcon from '../../icons/WarningSmallFilledIcon';
import { COLOR as ICOLOR, SIZE as ISIZE } from '../../icons';
import './CRTableCellCustomer.scss';

export default class CRTableCellCustomer extends PureComponent {
    render() {
        let { number, name, isBlocked, blockingText, isHighlighted } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer', {
            'mrc-ui-crtable-cell-customer-highlighted': isHighlighted,
        });
        return (
            <div className={className}>
                {isBlocked ? (
                    <WarningSmallFilledIcon size={ISIZE.SMALL} fill={ICOLOR.LIGHT_RED} />
                ) : (
                    <CheckmarkFilledIcon size={ISIZE.SMALL} />
                )}
                <div>
                    <span>{number}</span>
                    <span className="mrc-ui-crtable-cell-customer-name">{name}</span>
                    {isBlocked && <span className="mrc-ui-crtable-cell-customer-blocked">{blockingText}</span>}
                </div>
            </div>
        );
    }
}
