import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class MenuIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 56 56"
            >
                {/* <style type="text/css">
                .st0{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
            </style> */}
                <g className={colorToStrokeClassName} fill="none" strokeWidth="2">
                    <path className="st0" d="M43,15.2H11" />
                    <path className="st0" d="M43,23.7H11" />
                    <path className="st0" d="M43,32.3H11" />
                    <path className="st0" d="M43,40.8H11" />
                </g>
            </svg>
        );
    }
}

MenuIcon.propTypes = iconPropTypes;
