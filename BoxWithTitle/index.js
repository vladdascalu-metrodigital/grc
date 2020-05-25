import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export const TYPE = {
    SMALLER: 'smaller',
};

export default class BoxWithTitle extends Component {
    constructor(props) {
        super(props);
        this.handleActionClick.bind(this);
    }

    handleActionClick() {
        if (this.props.action && this.props.action.fn) {
            this.props.action.fn();
        }
    }

    render() {
        let { action, children, title, type } = this.props;
        let className = classnames('mrc-ui-box-with-title', {
            'mrc-ui-box-with-title-smaller': type === TYPE.SMALLER,
        });
        return (
            <div className={className}>
                <div className="mrc-ui-box-with-title-header">
                    <h4 className="mrc-ui-box-with-title-title">{title}</h4>
                    {action && (
                        <span className="mrc-ui-box-with-title-action" onClick={this.handleActionClick}>
                            {action.title}
                        </span>
                    )}
                </div>
                <div className="mrc-ui-box-with-title-content">{children}</div>
            </div>
        );
    }
}

BoxWithTitle.propTypes = {
    title: PropTypes.string,
    action: PropTypes.shape({
        title: PropTypes.string,
        fn: PropTypes.func,
    }),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    type: PropTypes.string,
};
