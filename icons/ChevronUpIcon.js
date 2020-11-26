import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ChevronUpIcon extends PureComponent {
    render() {
        let { svgClassName, colorToFillClassName } = iconClassNames(this.props);
        return (
            <svg
                className={svgClassName}
                viewBox="0 0 14 9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                focusable="false"
            >
                <path
                    className={colorToFillClassName}
                    d="M10.22,6.28c0.293,0.293 0.767,0.293 1.06,0c0.293,-0.293 0.293,-0.767 0,-1.06l-5,-5c-0.293,-0.293 -0.767,-0.293 -1.06,0l-5,5c-0.293,0.293 -0.293,0.767 0,1.06c0.293,0.293 0.767,0.293 1.06,0l4.47,-4.469l4.47,4.469Z"
                />
            </svg>
        );
    }
}

ChevronUpIcon.propTypes = iconPropTypes;
