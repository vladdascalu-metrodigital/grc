import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ArrowLeftIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 17 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinejoin="round">
                    <g className={colorToStrokeClassName} transform="translate(-1598.000000, -143.000000)">
                        <g transform="translate(1606.857143, 151.000000) rotate(90.000000) translate(-1606.857143, -151.000000) translate(1600.000000, 143.000000)">
                            <polygon points="9.00033333 15.6692667 4.33366667 15.6692667 4.33366667 7.0026 0.000333333333 7.0026 6.667 0.333266667 13.3336667 7.0026 9.00033333 7.0026"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

ArrowLeftIcon.propTypes = iconPropTypes;
