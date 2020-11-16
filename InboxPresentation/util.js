import { lookup } from '../Util/translations';
import MrcDate from '../MrcDate';
import React from 'react';

export const createIssueAndRequestDate = (entry) => {
    return (
        <p>
            {entry.issueDate || entry.creationDate ? (
                <React.Fragment>
                    <label>{lookup('inbox.issueDate')}:&nbsp;</label>
                    <MrcDate>{entry.issueDate ? entry.issueDate : entry.creationDate}</MrcDate>
                </React.Fragment>
            ) : null}
            {(entry.issueDate || entry.creationDate) && entry.requestDate ? ',' : null}
            &nbsp;
            {entry.requestDate ? (
                <React.Fragment>
                    <label>{lookup('inbox.requestDate')}:&nbsp;</label>
                    <MrcDate>{entry.requestDate}</MrcDate>
                </React.Fragment>
            ) : null}
        </p>
    );
};
