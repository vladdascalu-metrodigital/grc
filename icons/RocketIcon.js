import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ArrowLeftIcon extends PureComponent {
    render() {
        let { svgClassName, colorToStrokeClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                width="20px"
                height="20px"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <g className={colorToStrokeClassName} transform="translate(-1219.000000, -40.000000)">
                        <g transform="translate(1218.000000, 24.500000)">
                            <g transform="translate(0.000000, 10.500000)">
                                <g transform="translate(2.000000, 7.000000)">
                                    <path d="M4.27609565,9.76155197 C4.27609565,9.76155197 12.8417478,2.08132422 13.3958348,1.5865706 C14.2254,0.844790062 17.5467913,0.350036439 17.5467913,0.350036439 C17.5467913,0.350036439 16.993487,3.31855818 16.1623565,4.06103851 C15.0557478,5.05054576 7.03166087,12.225523 7.03166087,12.225523 L4.27609565,9.76155197 L4.27609565,9.76155197 Z"></path>
                                    <line x1="5.38004348" y1="8.76588654" x2="8.13873913" y2="11.2354559"></line>
                                    <path d="M11.1819913,8.51508075 C11.1819913,9.00983437 11.1819913,10.9881491 10.9049478,11.7306294 C10.7296435,12.2008903 10.1779043,12.8754907 9.79755652,13.2155901 C8.70816522,14.1897019 7.03103478,15.6893582 7.03103478,15.6893582 L7.54442609,11.7663188"></path>
                                    <path d="M8.41492174,6.04047288 C7.8624,6.04047288 5.62492174,6.01947909 4.79535652,6.266506 C4.26944348,6.42395942 3.53692174,6.93830725 3.15735652,7.27770683 C2.06718261,8.25251843 0.390834783,9.75147495 0.390834783,9.75147495 L4.80553043,9.26861781"></path>
                                    <path d="M5.37127826,12.2251731 C5.92536522,12.7199267 5.69449565,13.4211193 5.09423478,13.9578605 C4.3304087,14.6401586 0.667017391,15.4519184 0.667017391,15.4519184 C0.667017391,15.4519184 1.56388696,12.1663905 2.32771304,11.4833925 C2.9358,10.9396534 3.71136522,10.7409122 4.26466957,11.2356658"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

ArrowLeftIcon.propTypes = iconPropTypes;
