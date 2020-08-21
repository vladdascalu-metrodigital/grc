import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class HistoryIcon extends PureComponent {
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
                    classNAme={colorToStrokeClassName}
                    id="history"
                    transform="translate(9.000000, 1.000000)"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                >
                    <rect x="0" y="0" width="16" height="32"></rect>
                    <circle cx="8" cy="16" r="3.4"></circle>
                    <circle cx="8" cy="6.7" r="3.4"></circle>
                    <circle cx="8" cy="25.3" r="3.4"></circle>
                </g>
            </svg>
        );
    }
}

HistoryIcon.propTypes = iconPropTypes;
