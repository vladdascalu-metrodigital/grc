import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ProfileIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                width="48px"
                height="48px"
                viewBox="0 0 48 48"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinejoin="round">
                    <g className={colorToStrokeClassName} transform="translate(-207.000000, -244.000000)">
                        <g transform="translate(208.000000, 245.000000)">
                            <path
                                d="M19,29 C19,29 16,28 16,23 C14.348,23 14.348,19 16,19 C16,18.33 13,11 18,12 C19,8 30,8 31,12 C31.694,14.776 30,18.508 30,19 C31.652,19 31.652,23 30,23 C30,28 27,29 27,29 L27,34 C31.954,35.858 36.86,37.394 39.372,39.15 C43.468,34.998 46,29.294 46,23 C46,10.296 35.704,0 23,0 C10.296,0 0,10.296 0,23 C0,29.306 2.54,35.018 6.65,39.174 C9.31,37.334 14.554,35.682 19,34 L19,29 L19,29 Z"
                                id="Stroke-1068"
                            ></path>
                            <path
                                d="M6.6504,39.1738 C10.8204,43.3878 16.6044,45.9998 23.0004,45.9998 C29.4064,45.9998 35.1984,43.3798 39.3704,39.1498"
                                id="Stroke-1069"
                            ></path>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

ProfileIcon.propTypes = iconPropTypes;
