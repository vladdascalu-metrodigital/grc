import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class SearchCircledIcon extends PureComponent {
    render() {
        let { svgClassName, colorToFillClassName, circleClassName } = iconClassNames(this.props);
        return (
            <div className={circleClassName}>
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
                        d="m31.71 30.29-10.71-10.7a11.94 11.94 0 1 0 -1.41 1.41l10.7 10.71a1 1 0 0 0 1.41-1.41zm-29.71-18.38a9.91 9.91 0 1 1 9.91 9.91 9.92 9.92 0 0 1 -9.91-9.91z"
                    />
                </svg>
            </div>
        );
    }
}

SearchCircledIcon.propTypes = iconPropTypes;
