import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { stickyOffsetFromCombined } from '../Util/stickyUtil';

import './index.scss';

class Root extends Component {
    render() {
        let { children, className, fixedLayout, ...otherProps } = this.props;
        className = classnames(className, 'mrc-ui-table', {
            'mrc-ui-table-fixed-layout': fixedLayout,
        });
        return (
            <table {...otherProps} className={className}>
                {children}
            </table>
        );
    }
}

Root.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fixedLayout: PropTypes.bool,
};

class Head extends Component {
    render() {
        let { children, className, ...otherProps } = this.props;
        className = classnames(className, 'mrc-ui-table-head');
        return (
            <thead {...otherProps} className={className}>
                {children}
            </thead>
        );
    }
}

Head.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

class Body extends Component {
    render() {
        let { children, className, ...otherProps } = this.props;
        className = classnames(className, 'mrc-ui-table-body');
        return (
            <tbody {...otherProps} className={className}>
                {children}
            </tbody>
        );
    }
}

Body.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

class R extends Component {
    constructor(props) {
        super(props);
        if (this.props.sticky) {
            this.selfRef = React.createRef();
        }
    }

    componentDidMount() {
        let { sticky, stickyOffset } = this.props;
        if (sticky) {
            stickyOffsetFromCombined({
                node: this.selfRef.current,
                stickyNamespace: sticky,
                offsetSelector: typeof stickyOffset === 'string' ? stickyOffset : undefined,
                offsetPx: typeof stickyOffset === 'number' ? stickyOffset : undefined,
                callback: (offset) => this.selfRef.current.style.setProperty('--sticky-top', offset + 'px'),
            });
        }
    }

    render() {
        let { className, children, sticky, isHovered, isActive, type, ...otherProps } = this.props;
        delete otherProps.stickyOffset;
        className = classnames(className, 'mrc-ui-table-r', {
            'mrc-ui-table-r-sticky': sticky,
            'mrc-ui-table-r-active': isActive,
            'mrc-ui-table-r-hover': isHovered,
            'mrc-ui-table-r-head': type === 'head',
            'mrc-ui-table-r-head-light': type === 'head-light',
            'mrc-ui-table-r-light': type === 'light',
            'mrc-ui-table-r-form': type === 'form',
            'mrc-ui-table-r-zebra': type === 'zebra',
            'mrc-ui-table-r-invalid': type === 'invalid',
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
        className = classnames(className, 'mrc-ui-table-h', {
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
        className = classnames(className, 'mrc-ui-table-d', {
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

H.propTypes = {
    borderFix: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    flush: PropTypes.bool,
};

D.propTypes = {
    ...H.prototypes,
};

export default {
    Root,
    Head,
    Body,
    R,
    H,
    D,
};
