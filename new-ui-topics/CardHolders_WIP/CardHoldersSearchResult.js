import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import IconAndLabels from '../../icons/IconAndLabels';
import SearchCircledIcon from '../../icons/SearchCircledIcon';
import BusinessIcon from '../../icons/BusinessIcon';
import BoxWithTitle from '../../BoxWithTitle';
import DrillDownItem from '../../DrillDownItem';

export default class CardHoldersSearchHistory extends Component {
    render() {
        return (
            <BoxWithTitle title="3 Search Results" type="smaller" flush>
                <DrillDownItem>
                    <IconAndLabels icon={SearchCircledIcon} title="Top Ag" subtitle="10/120045" />
                </DrillDownItem>
                <DrillDownItem>
                    <IconAndLabels icon={SearchCircledIcon} title="Super Gbr" subtitle="10/120045" />
                </DrillDownItem>
                <DrillDownItem>
                    <IconAndLabels icon={BusinessIcon} title="Great Holding" subtitle="14/1222045" />
                </DrillDownItem>
            </BoxWithTitle>
        );
    }
}
