import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { COLOR as IC } from '../icons';
import ChevronRightIcon from '../icons/ChevronRightIcon';

import './index.scss';

export default class DrillDownItem extends Component {
    render() {
        let { onClick } = this.props;
        return (
            <div className="mrc-ui-drill-down-item" onClick={onClick}>
                {this.props.children}
                <div className="mrc-ui-drill-down-chevron">
                    <ChevronRightIcon color={IC.INTERACTION} />
                </div>
            </div>
        );
    }
}

DrillDownItem.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
};
