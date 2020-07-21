import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export const SPACING = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

export class FlexRow extends Component {
    render() {
        let { className, inline, justifyContent, alignItems, children, gap, leading, flexWrap } = this.props;
        className = classnames(
            className,
            'mrc-ui-flex-row',
            gap && 'mrc-ui-flex-row-gap-' + gap,
            leading && 'mrc-ui-flex-row-leading-' + leading,
            {
                'mrc-ui-flex-row-inline': inline,
            }
        );
        let style = {
            '--justify-content': justifyContent,
            '--align-items': alignItems,
            '--flex-wrap': flexWrap,
        };
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }
}

export class FlexColumn extends Component {
    render() {
        let { className, inline, justifyContent, alignItems, children, gap } = this.props;
        className = classnames(className, 'mrc-ui-flex-column', gap && 'mrc-ui-flex-column-gap-' + gap, {
            'mrc-ui-flex-column-inline': inline,
        });
        let style = {
            '--justify-content': justifyContent,
            '--align-items': alignItems,
        };
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }
}

FlexRow.propTypes = {
    className: PropTypes.string,
    inline: PropTypes.bool,
    justifyContent: PropTypes.oneOf([
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
        'left',
        'right',
        'normal',
        'space-between',
        'space-around',
        'space-evenly',
        'stretch',
    ]),
    alignItems: PropTypes.oneOf(['normal', 'stretch', 'center', 'start', 'end', 'flex-start', 'flex-end', 'baseline']),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    gap: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
    leading: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
    flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse', 'inherit', 'initial', 'unset']),
};

FlexColumn.propTypes = FlexRow.propTypes;
