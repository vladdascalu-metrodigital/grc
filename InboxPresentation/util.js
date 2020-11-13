import { lookup } from 'global-react-components/Util/translations';
import MrcDate from 'global-react-components/MrcDate';
import React from 'react';

export const createIssueAndRequestDate = (entry) => {
    return (
        <p>
            {entry.issueDate ? (
                <React.Fragment>
                    <label>{lookup('inbox.issueDate')}:&nbsp;</label>
                    <MrcDate>{entry.issueDate}</MrcDate>
                </React.Fragment>
            ) : null}
            {entry.issueDate && entry.requestDate ? ',' : null}
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
