import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ChevronRightIcon extends PureComponent {
    render() {
        let { svgClassName, colorToFillClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                focusable="false"
            >
                <path
                    className={colorToFillClassName}
                    d="M19.89 16a1 1 0 01-.29.71l-6 6a1 1 0 01-1.41-1.41l5.29-5.3-5.29-5.29a1 1 0 011.41-1.42l6 6a1 1 0 01.29.71z"
                />
            </svg>
        );
    }
}

ChevronRightIcon.propTypes = iconPropTypes;
