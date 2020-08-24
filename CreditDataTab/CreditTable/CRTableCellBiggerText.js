import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './CRTableCellBiggerText.scss';
import './CRTableCellTypoHighlight.scss';
import PropTypes from 'prop-types';

export default class CRTableCellBiggerText extends PureComponent {
    render() {
        let { text, color } = this.props;
        let className = classnames('mrc-ui-crtable-cell-bigger-text', {
            'mrc-ui-crtable-cell-highlight-color-green': color === 'green',
            'mrc-ui-crtable-cell-highlight-color-blue': color === 'blue',
            'mrc-ui-crtable-cell-highlight-color-red': color === 'red',
            'mrc-ui-crtable-cell-highlight-color-grey': color === 'grey',
        });
        return <div className={className}>{text}</div>;
    }
}

CRTableCellBiggerText.propTypes = {
    text: PropTypes.string,
    color: PropTypes.oneOf(['green', 'blue', 'red']),
};
