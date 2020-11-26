import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ChevronUpDownIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 11 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <g className={colorToStrokeClassName} id="Group-1450" transform="translate(1.000000, 1.000000)">
                        <polyline id="Stroke-4625" points="8.75 4.5 4.5 0.25 0.25 4.5"></polyline>
                        <polyline id="Stroke-4626" points="8.75 7.5 4.5 11.75 0.25 7.5"></polyline>
                    </g>
                </g>
            </svg>
        );
    }
}

ChevronUpDownIcon.propTypes = iconPropTypes;
