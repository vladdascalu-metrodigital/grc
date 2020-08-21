import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class PlusIcon extends PureComponent {
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
                    d="m29 16c0 .552-.447 1-1 1h-11v11c0 .552-.447 1-1 1s-1-.448-1-1v-11h-11c-.553 0-1-.448-1-1s.447-1 1-1h11v-11c0-.552.447-1 1-1s1 .448 1 1v11h11c.553 0 1 .448 1 1"
                />
            </svg>
        );
    }
}

PlusIcon.propTypes = iconPropTypes;
