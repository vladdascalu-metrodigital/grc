import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class CalendarIcon extends PureComponent {
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
                    d="m16 0a16 16 0 1 0 16 16 16 16 0 0 0 -16-16zm0 30a14 14 0 1 1 14-14 14 14 0 0 1 -14 14zm6.49-19.08-5.08 5.08 5.08 5.08a1 1 0 1 1 -1.41 1.41l-5.08-5.08-5.08 5.08a1 1 0 0 1 -1.41-1.41l5.08-5.08-5.08-5.08a1 1 0 0 1 1.41-1.41l5.08 5.08 5.08-5.08a1 1 0 0 1 1.41 1.41z"
                />
            </svg>
        );
    }
}

CalendarIcon.propTypes = iconPropTypes;
