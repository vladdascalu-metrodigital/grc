import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { COLOR as IC } from '../icons';
import ChevronRightIcon from '../icons/ChevronRightIcon';

import './index.scss';

export default class DrillDownItem extends Component {
    render() {
        let { active, onClick } = this.props;
        let className = classnames('mrc-ui-drill-down-item', {
            'mrc-ui-drill-down-item-active': active,
        });
        return (
            <div className={className} onClick={onClick}>
                {this.props.children}
                <div className="mrc-ui-drill-down-chevron">
                    <ChevronRightIcon color={IC.INTERACTION} />
                </div>
            </div>
        );
    }
}

DrillDownItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
};
