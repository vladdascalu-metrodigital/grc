import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class CheckMarkFilledIcon extends PureComponent {
    render() {
        let { svgClassName, colorToFillClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                focusable="false"
            >
                <path
                    className={colorToFillClassName}
                    d="M40 0a40 40 0 1040 40A40 40 0 0040 0zm19.52 28.15L36 54.4a1.78 1.78 0 01-2.67 0L20.48 40.1a1.92 1.92 0 01.1-2.65 1.78 1.78 0 012.57.1l11.49 12.81L56.85 25.6a1.78 1.78 0 012.57-.1 1.92 1.92 0 01.1 2.65z"
                />
            </svg>
        );
    }
}

CheckMarkFilledIcon.propTypes = iconPropTypes;
