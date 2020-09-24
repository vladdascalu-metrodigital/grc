import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class MetroIcon extends PureComponent {
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
                <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(0.000000, 4.000000)"
                >
                    <polygon
                        id="path-1"
                        fill="#FFED00"
                        points="19.8050736 26.7878788 25.5000001 9.9619596 25.5000001 26.7878788 34 26.7878788 34 1.18962079e-14 22.5253675 1.18962079e-14 17.0000001 13.3939394 11.4751225 1.18962079e-14 0 1.18962079e-14 0 26.7878788 8.50049007 26.7878788 8.50049007 9.9619596 14.2375613 26.7878788"
                    ></polygon>
                </g>
            </svg>
        );
    }
}

MetroIcon.propTypes = iconPropTypes;
