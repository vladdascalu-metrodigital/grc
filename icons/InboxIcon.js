import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class InboxIcon extends PureComponent {
    render() {
        let { svgClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                width="34px"
                height="34px"
                viewBox="0 0 34 34"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g
                        transform="translate(1.000000, 6.000000)"
                        stroke="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    >
                        <path
                            d="M32,19.4 C32,20.7 31,21.7 29.7,21.7 L2.3,21.7 C1,21.7 0,20.7 0,19.4 L0,2.6 C0,1.3 1,0.3 2.3,0.3 L29.7,0.3 C31,0.3 32,1.3 32,2.6 L32,19.4 Z"
                            id="Path"
                        ></path>
                        <polyline points="31.2 1.1 16 13.3 0.8 1.1"></polyline>
                    </g>
                </g>
            </svg>
        );
    }
}

InboxIcon.propTypes = iconPropTypes;
