import React, { Component } from 'react';
import classnames from 'classnames';

export default class Attachment extends Component {
    constructor(props) {
        super(props);
        this.classnames = {
            missing: 'mrc-ui-attachment-missing',
            deleted: 'mrc-ui-attachment-deleted',
        };
    }

    render() {
        const classes = classnames('mrc-ui-attachment', this.classnames[this.props.type]);
        return <div className={classes}>Hello World!</div>;
    }
}
