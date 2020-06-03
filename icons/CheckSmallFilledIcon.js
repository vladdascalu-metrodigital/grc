import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class CheckSmallFilledIcon extends PureComponent {
    render() {
        let { svgClassName, fillClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                focusable="false"
            >
                <path
                    className={fillClassName}
                    d="m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm3.83 6.12-4.74 4.66a.67.67 0 0 1 -1 0l-1.93-1.78a.67.67 0 1 1 1-.87l1.45 1.2 4.23-4.11a.67.67 0 0 1 1 .9z"
                />
            </svg>
        );
    }
}

CheckSmallFilledIcon.propTypes = iconPropTypes;
