import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { timePeriodFilters, fileTypeFilters, docTypeFilters } from './documentFilterObjects';

import BoxWithTitle from '../../BoxWithTitle';
import DocumentFilter from './DocumentFilter';
import { FlexColumn } from '../../Flex';
import Attachment from '../../Attachments/Attachment';

import './index.scss';

export default class DocumentService extends Component {
    render() {
        let { data } = this.props;
        return (
            <FlexColumn gap="medium">
                <DocumentFilter allFilters={{ timePeriodFilters, fileTypeFilters, docTypeFilters }} />
                <BoxWithTitle title="10 Documents in Customer Group" type="smaller">
                    {data.map((d, k) => {
                        return (
                            <React.Fragment key={k}>
                                <h3 className="mrc-ui-documentservice-group-heading">{d.title}</h3>
                                <div className="mrc-ui-documentservice-group">
                                    {d.attachments.map((a, k) => (
                                        <Attachment key={k} {...a} />
                                    ))}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </BoxWithTitle>
            </FlexColumn>
        );
    }
}

DocumentService.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            attachments: PropTypes.arrayOf(PropTypes.object),
        })
    ),
};

DocumentService.defaultProps = {
    data: [],
};
