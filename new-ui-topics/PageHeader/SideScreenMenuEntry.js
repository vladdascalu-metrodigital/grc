import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './SideScreenMenuEntry.scss';

export default class SideScreenMenuEntry extends PureComponent {
    render() {
        let { menuTitle, menuLogo } = this.props;
        return (
            <div className="mrc-ui-side-screen-menu-entry">
                <div className="mrc-ui-side-screen-menu-icon">{menuLogo}</div>
                <div className="mrc-ui-side-screen-menu-label">{menuTitle}</div>
            </div>
        );
    }
}

SideScreenMenuEntry.PropTypes = {
    menuTitle: PropTypes.string,
    menuLogo: PropTypes.string,
};
