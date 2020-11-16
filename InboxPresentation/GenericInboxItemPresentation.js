import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createIssueAndRequestDate } from './util';

export default class GenericInboxItemPresentation extends Component {
    render() {
        const entry = this.props.entry || {};

        return <div>{createIssueAndRequestDate(entry)}</div>;
    }
}

GenericInboxItemPresentation.propTypes = {
    collapsed: PropTypes.bool,
    entry: PropTypes.shape({
        requestDate: PropTypes.string,
        issueDate: PropTypes.string,
        creationDate: PropTypes.string,
    }),
};
