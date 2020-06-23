import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ProfileIcon extends PureComponent {
    render() {
        let { svgClassName, colorToFillClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                    className={colorToFillClassName}
                    d="M9.71 19.29l6.29 6.3 6.29-6.29a1 1 0 011.41 1.41l-7 7a1 1 0 01-1.41 0l-7-7A1 1 0 119.7 19.3zM22.3 12.7L16 6.41l-6.29 6.3A1 1 0 018.3 11.3l7-7a1 1 0 011.41 0l7 7a1 1 0 01-1.41 1.41z"
                />
            </svg>
        );
    }
}

ProfileIcon.propTypes = iconPropTypes;
