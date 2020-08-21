import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class CreditCorrectionIcon extends PureComponent {
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
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                >
                    <g id="credit-correction-white">
                        <g
                            id="Group"
                            transform="translate(2.000000, 20.000000)"
                            stroke="#FFFFFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        >
                            <rect id="Rectangle" x="0" y="0" width="5" height="11"></rect>
                            <path
                                d="M5,8.83395479 C18.8297872,13.5038044 14.1945289,13.5038044 30,5.46553867 C28.556231,4.01099534 27.5683891,3.7813306 26.0486322,4.16410516 L20.1975684,6.00142305"
                                id="Path"
                            ></path>
                            <path
                                d="M5,2 L8.83763838,2 C11.8634686,2 14.00369,3.85714286 14.6678967,4.5 C14.6678967,4.5 16.5867159,4.5 18.5055351,4.5 C20.498155,4.5 20.498155,7 18.5055351,7 L11.4206642,7"
                                id="Path"
                            ></path>
                        </g>
                        <g
                            id="Group"
                            transform="translate(13.000000, 2.000000)"
                            stroke="#FFFFFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        >
                            <path
                                d="M4.91657397,15.7897664 L0,17 L1.13459399,12.083426 L12.8587319,0.510567297 C13.5394883,-0.170189099 14.3715239,-0.170189099 14.9010011,0.510567297 L16.4894327,2.09899889 C17.1701891,2.77975528 17.1701891,3.61179088 16.4894327,4.14126808 L4.91657397,15.7897664 Z"
                                id="Path"
                            ></path>
                            <line x1="15" y1="6" x2="11" y2="2" id="Path"></line>
                            <line x1="6" y1="16" x2="2" y2="12" id="Path"></line>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

CreditCorrectionIcon.propTypes = iconPropTypes;
