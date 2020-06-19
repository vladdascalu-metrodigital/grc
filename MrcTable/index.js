import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

class Root extends Component {
    render() {
        let { children, ...otherProps } = this.props;
        return (
            <table {...otherProps} className="mrc-ui-table">
                {children}
            </table>
        );
    }
}

class Head extends Component {
    render() {
        let { children, ...otherProps } = this.props;
        return (
            <thead {...otherProps} className="mrc-ui-table-head">
                {children}
            </thead>
        );
    }
}

class Body extends Component {
    render() {
        let { children, ...otherProps } = this.props;
        return (
            <tbody {...otherProps} className="mrc-ui-table-body">
                {children}
            </tbody>
        );
    }
}

class R extends Component {
    constructor(props) {
        super(props);
        if (this.props.sticky) {
            this.selfRef = React.createRef();
        }
    }

    getStickyTop(node, top = 0) {
        let prevSibling = node.previousSibling;
        if (prevSibling && prevSibling.dataset.sticky === this.props.sticky) {
            let prevSiblingOffset = top + prevSibling.clientHeight;
            return this.getStickyTop(prevSibling, prevSiblingOffset);
        } else {
            return top;
        }
    }

    componentDidMount() {
        let { sticky, stickyOffset } = this.props;
        if (sticky) {
            let stickyTopOffset = 0;
            if (typeof stickyOffset === 'number') {
                stickyTopOffset = stickyOffset;
            } else if (typeof stickyOffset === 'string' && document.querySelector(stickyOffset)) {
                stickyTopOffset = Array.from(document.querySelectorAll(stickyOffset)).reduce(
                    (height, el) => (height += el.clientHeight),
                    0
                );
            }
            let stickyTop = stickyTopOffset + this.getStickyTop(this.selfRef.current);
            this.selfRef.current.style.setProperty('--sticky-top', stickyTop + 'px');
        }
    }

    render() {
        let { className, children, sticky, isHovered, isActive, type, ...otherProps } = this.props;
        delete otherProps.stickyOffset;
        className = classnames('mrc-ui-table-r', {
            'mrc-ui-table-r-sticky': sticky,
            'mrc-ui-table-r-active': isActive,
            'mrc-ui-table-r-hover': isHovered,
            'mrc-ui-table-r-head': type === 'head',
            'mrc-ui-table-r-head-light': type === 'head-light',
            'mrc-ui-table-r-light': type === 'light',
            'mrc-ui-table-r-form': type === 'form',
            'mrc-ui-table-r-zebra': type === 'zebra',
            'mrc-ui-table-r-invalid': type === 'invalid',
            className,
        });
        return (
            <tr {...otherProps} className={className} data-sticky={sticky} ref={this.selfRef}>
                {children}
            </tr>
        );
    }
}

R.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    sticky: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isHovered: PropTypes.bool,
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(['head', 'head-light', 'light', 'form', 'zebra']),
};

class H extends Component {
    render() {
        let { borderFix, className, children, flush, ...otherProps } = this.props;
        className = classnames('mrc-ui-table-h', className, {
            'mrc-ui-table-border-fix': borderFix,
            'mrc-ui-table-d-flush': flush,
        });
        return (
            <th {...otherProps} className={className}>
                {children}
            </th>
        );
    }
}

class D extends Component {
    render() {
        let { borderFix, className, children, flush, ...otherProps } = this.props;
        className = classnames('mrc-ui-table-d', className, {
            'mrc-ui-table-border-fix': borderFix,
            'mrc-ui-table-d-flush': flush,
        });
        return (
            <td {...otherProps} className={className}>
                {children}
            </td>
        );
    }
}

export default {
    Root,
    Head,
    Body,
    R,
    H,
    D,
};
