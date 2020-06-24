import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import IconAndLabels from '../../icons/IconAndLabels';
import SearchCircledIcon from '../../icons/SearchCircledIcon';
import BoxWithTitle from '../../BoxWithTitle';
import DrillDownItem from '../../DrillDownItem';

export default class CardHoldersSearchHistory extends Component {
    render() {
        return (
            <BoxWithTitle title="10 Last searches" type="smaller" flush>
                <DrillDownItem>
                    <IconAndLabels icon={SearchCircledIcon} title="Müller" type="all-light" />
                </DrillDownItem>
                <DrillDownItem>
                    <IconAndLabels icon={SearchCircledIcon} title="12/23412" type="all-light" />
                </DrillDownItem>
            </BoxWithTitle>
        );
    }
}
