import React, { Component } from 'react';
import classnames from 'classnames';

class Root extends Component {
    render() {
        return <table className="mrc-ui-table">{this.props.children}</table>;
    }
}

class Head extends Component {
    render() {
        return <thead className="mrc-ui-table-head">{this.props.children}</thead>;
    }
}

class Body extends Component {
    render() {
        return <tbody className="mrc-ui-table-body">{this.props.children}</tbody>;
    }
}

class R extends Component {
    render() {
        let { className, children, isSticky, ...otherProps } = this.props;
        className = classnames('mrc-ui-table-r', {
            'mrc-ui-table-sticky': isSticky,
        });
        return (
            <tr className={className} {...otherProps}>
                {children}
            </tr>
        );
    }
}

class H extends Component {
    render() {
        let { borderFix, className, children, ...otherProps } = this.props;
        className = classnames('mrc-ui-table-h', {
            'mrc-ui-table-border-fix': borderFix,
        });
        return (
            <th className={className} {...otherProps}>
                {children}
            </th>
        );
    }
}

class D extends Component {
    render() {
        let { borderFix, className, children, ...otherProps } = this.props;
        className = classnames('mrc-ui-table-d', {
            'mrc-ui-table-border-fix': borderFix,
        });
        return (
            <td className={className} {...otherProps}>
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
