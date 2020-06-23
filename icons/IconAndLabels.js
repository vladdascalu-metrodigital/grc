import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { COLOR as ICLR, iconPropTypes } from './index';

import './IconAndLabels.scss';

export const TYPE = {
    // STRONG_AND_LIGHT: 'strong-light', // default // default icon, blue bold title, light/grey subtitle
    STRONG_AND_NORMAL: 'strong-normal', // default icon, blue bold title and subtitle
    ALL_LIGHT: 'all-light', // grey icon, grey font
};

export default class IconAndLabels extends PureComponent {
    render() {
        let { icon: Icon, title, subtitle, iconColor, type } = this.props;
        let className = classnames('mrc-ui-iconandlabels', type && 'mrc-ui-iconandlabels-' + type);
        if (type === TYPE.ALL_LIGHT) {
            iconColor = ICLR.MUTED;
        }
        return (
            <div className={className}>
                <Icon color={iconColor} />
                <div className="mrc-ui-iconandlabels-labels">
                    <span className="mrc-ui-iconandlabels-title">{title}</span>
                    <span className="mrc-ui-iconandlabels-subtitle">{subtitle}</span>
                </div>
            </div>
        );
    }
}

IconAndLabels.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([TYPE.STRONG_AND_LIGHT, TYPE.STRONG_AND_NORMAL, TYPE.ALL_LIGHT]),
    subtitle: PropTypes.string,
    iconColor: iconPropTypes.color,
};
