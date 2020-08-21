import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class LimitCheckIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                width="34px"
                height="34px"
                viewBox="0 0 34 34"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g
                    className={colorToStrokeClassName}
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(1.000000, 1.000000)"
                    stroke="#FFFFFF"
                    strokeLinejoin="round"
                    strokeWidth="2"
                >
                    <rect x="0" y="18.8" width="5.6" height="11.2"></rect>
                    <path
                        d="M5.6,27.9 C20.2,32.8 15.3,32.8 32,24.4 C30.5,22.9 29.4,22.6 27.8,23 L21.6,25"
                        strokeLinecap="round"
                    ></path>
                    <path
                        d="M5.6,20.2 L9.8,20.2 C13.1,20.2 15.4,22.3 16.1,23 C16.1,23 18.2,23 20.3,23 C22.5,23 22.5,25.8 20.3,25.8 L12.6,25.8"
                        strokeLinecap="round"
                    ></path>
                    <circle strokeLinecap="round" cx="23.7" cy="4.9" r="4.2"></circle>
                    <circle strokeLinecap="round" cx="16.7" cy="14.7" r="4.2"></circle>
                    <line x1="16.7" y1="13.3" x2="16.7" y2="16.1" strokeLinecap="round"></line>
                    <line x1="23.7" y1="3.5" x2="23.7" y2="6.3" strokeLinecap="round"></line>
                </g>
            </svg>
        );
    }
}

LimitCheckIcon.propTypes = iconPropTypes;
