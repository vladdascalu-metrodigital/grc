import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class CheckIcon extends PureComponent {
    render() {
        let { svgClassName, colorToFillClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                focusable="false"
            >
                <path
                    className={colorToFillClassName}
                    d="m13.05 24a1 1 0 0 1 -.73-.32l-7.05-7.62a1 1 0 0 1 1.46-1.36l6.32 6.83 12.22-13.21a1 1 0 0 1 1.47 1.36l-12.95 14a1 1 0 0 1 -.74.32z"
                />
            </svg>
        );
    }
}

CheckIcon.propTypes = iconPropTypes;
