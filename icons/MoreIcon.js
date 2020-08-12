import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class MoreIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg className={svgClassName} viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g className={colorToStrokeClassName} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(1.000000, 1.000000)">
                        <rect x="0" y="0" width="32" height="32" rx="16"></rect>
                        <g transform="translate(5.333333, 13.333333)" strokeLinecap="round" strokeLinejoin="round">
                            <path
                                d="M4.88888889,2.66666667 C4.88888889,3.89422222 3.89422222,4.88888889 2.66666667,4.88888889 C1.43911111,4.88888889 0.444444444,3.89422222 0.444444444,2.66666667 C0.444444444,1.43911111 1.43911111,0.444444444 2.66666667,0.444444444 C3.89422222,0.444444444 4.88888889,1.43911111 4.88888889,2.66666667 L4.88888889,2.66666667 Z"
                                id="Stroke-4424"
                            ></path>
                            <path
                                d="M12.8888889,2.66666667 C12.8888889,3.89422222 11.8942222,4.88888889 10.6666667,4.88888889 C9.43911111,4.88888889 8.44444444,3.89422222 8.44444444,2.66666667 C8.44444444,1.43911111 9.43911111,0.444444444 10.6666667,0.444444444 C11.8942222,0.444444444 12.8888889,1.43911111 12.8888889,2.66666667 L12.8888889,2.66666667 Z"
                                id="Stroke-4425"
                            ></path>
                            <path
                                d="M20.8888889,2.66666667 C20.8888889,3.89422222 19.8942222,4.88888889 18.6666667,4.88888889 C17.4391111,4.88888889 16.4444444,3.89422222 16.4444444,2.66666667 C16.4444444,1.43911111 17.4391111,0.444444444 18.6666667,0.444444444 C19.8942222,0.444444444 20.8888889,1.43911111 20.8888889,2.66666667 L20.8888889,2.66666667 Z"
                                id="Stroke-4426"
                            ></path>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

MoreIcon.propTypes = iconPropTypes;
