import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ArrowLeftIcon extends PureComponent {
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
                <g className={colorToFillClassName}>
                    <path d="M28 16a1 1 0 01-1 1H7.41l7.3 7.29a1 1 0 010 1.42A1 1 0 0114 26a1 1 0 01-.71-.29l-9-9a.93.93 0 01-.21-.33.94.94 0 010-.76.93.93 0 01.21-.33l9-9a1 1 0 111.42 1.42L7.41 15H27a1 1 0 011 1z" />
                </g>
            </svg>
        );
    }
}

ArrowLeftIcon.propTypes = iconPropTypes;
