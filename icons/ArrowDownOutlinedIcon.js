import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ArrowDownOutlinedIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 17 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinejoin="round">
                    <g className={colorToStrokeClassName} transform="translate(-1525.000000, -38.000000)">
                        <g transform="translate(1218.000000, 24.500000)">
                            <g transform="translate(297.000000, 8.500000)">
                                <g transform="translate(18.000000, 15.142857) rotate(180.000000) translate(-18.000000, -15.142857) translate(10.000000, 6.000000)">
                                    <polygon points="10.2860952 17.9077333 4.9527619 17.9077333 4.9527619 8.00297143 0.000380952381 8.00297143 7.61942857 0.38087619 15.2384762 8.00297143 10.2860952 8.00297143"></polygon>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

ArrowDownOutlinedIcon.propTypes = iconPropTypes;
