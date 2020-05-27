import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export class FlexRow extends Component {
    render() {
        let { inline, justifyContent, alignItems, children } = this.props;
        let className = classnames('mrc-ui-flex-row', {
            'mrc-ui-flex-row-inline': inline,
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

export class FlexColumn extends Component {
    render() {
        let { inline, justifyContent, alignItems, children } = this.props;
        let className = classnames('mrc-ui-flex-column', {
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
};

FlexColumn.propTypes = FlexRow.propTypes;
