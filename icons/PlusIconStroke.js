import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class PlusIconStroke extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName, widthToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <g
                        className={`${colorToStrokeClassName} ${widthToStrokeClassName}`}
                        transform="translate(1.000000, 1.000000)"
                    >
                        <line x1="4" y1="0.173913043" x2="4" y2="7.82608696"></line>
                        <line x1="7.82608696" y1="4" x2="0.173913043" y2="4"></line>
                    </g>
                </g>
            </svg>
        );
    }
}

PlusIconStroke.propTypes = iconPropTypes;
