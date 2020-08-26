import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class LaunchPadIcon extends PureComponent {
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
                    stroke="none"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(4.000000, 4.000000)"
                >
                    <rect x="0" y="0" width="6" height="6"></rect>
                    <rect x="0" y="10" width="6" height="6"></rect>
                    <rect x="0" y="20" width="6" height="6"></rect>
                    <rect x="10" y="0" width="6" height="6"></rect>
                    <rect x="10" y="10" width="6" height="6"></rect>
                    <rect x="10" y="20" width="6" height="6"></rect>
                    <rect x="20" y="0" width="6" height="6"></rect>
                    <rect x="20" y="10" width="6" height="6"></rect>
                    <rect x="20" y="20" width="6" height="6"></rect>
                </g>
            </svg>
        );
    }
}

LaunchPadIcon.propTypes = iconPropTypes;
