import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class MetroIcon extends PureComponent {
    render() {
        let { svgClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#FBE400"
                    d="M33.2,15.2L28,28l-5.3-12.8H12v25.6h8V24.7l5.4,16.1h5.3L36,24.7v16.1h8V15.2H33.2z"
                />
            </svg>
        );
    }
}

MetroIcon.propTypes = iconPropTypes;
