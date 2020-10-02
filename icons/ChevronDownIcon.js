import React, { PureComponent } from 'react';
import { iconClassNames, iconPropTypes } from './index';

import './index.scss';

export default class ChevronDownIcon extends PureComponent {
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
                    d="M10.2196699,0.219669914 C10.5125631,-0.0732233047 10.9874369,-0.0732233047 11.2803301,0.219669914 C11.5732233,0.512563133 11.5732233,0.987436867 11.2803301,1.28033009 L6.28033009,6.28033009 C5.98743687,6.5732233 5.51256313,6.5732233 5.21966991,6.28033009 L0.219669914,1.28033009 C-0.0732233047,0.987436867 -0.0732233047,0.512563133 0.219669914,0.219669914 C0.512563133,-0.0732233047 0.987436867,-0.0732233047 1.28033009,0.219669914 L5.75,4.68933983 L10.2196699,0.219669914 Z"
                ></path>
            </svg>
        );
    }
}

ChevronDownIcon.propTypes = iconPropTypes;
