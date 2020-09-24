import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ReportingIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <g className={colorToStrokeClassName}>
                        <line x1="0.5" y1="22.5" x2="23.5" y2="22.5"></line>
                        <polyline points="4.5 22.5 4.5 17.5 1.5 17.5 1.5 22.5"></polyline>
                        <polyline points="10.5 22.5 10.5 12.5 7.5 12.5 7.5 22.5"></polyline>
                        <polyline points="16.5 22.5 16.5 14.5 13.5 14.5 13.5 22.5"></polyline>
                        <polyline points="22.5 22.5 22.5 7.5 19.5 7.5 19.5 22.5"></polyline>
                        <polyline points="21.5 0.5 15 7.5 9 5.5 3 10.5"></polyline>
                        <polyline points="17.5 0.5 21.5 0.5 21.5 4.5"></polyline>
                    </g>
                </g>
            </svg>
        );
    }
}

ReportingIcon.propTypes = iconPropTypes;
