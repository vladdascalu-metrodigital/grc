import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './CTableCellBiggerText.scss';
import './CRTableCellTypoHighlight.scss';

export default class CTableCellBiggerText extends PureComponent {
    render() {
        let { text, color } = this.props;
        let className = classnames('mrc-ui-crtable-cell-customer-prepayment-cash', {
            'mrc-ui-crtable-cell-highlight-color-green': color === 'green',
            'mrc-ui-crtable-cell-highlight-color-blue': color === 'blue',
        });
        return <div className={className}>{text}</div>;
    }
}

CTableCellBiggerText.propTypes = {
    text: PropTypes.string,
    color: PropTypes.oneOf(['green', 'blue']),
};
