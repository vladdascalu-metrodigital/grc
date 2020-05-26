import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class WarningSmallFilledIcon extends PureComponent {
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
                <g>
                    <path
                        className={fillClassName}
                        d="m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm-1 3.5a1 1 0 1 1 2 0v5a1 1 0 0 1 -2 0zm1 10a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1 -1.5 1.5z"
                    />
                </g>
            </svg>
        );
    }
}

WarningSmallFilledIcon.propTypes = iconPropTypes;
