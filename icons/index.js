import classnames from 'classnames';
import PropTypes from 'prop-types';

export const COLOR = {
    CONTRAST_WHITE: 'white',
    CONTRAST_BLACK: 'black',
    PRIMARY: 'primary',
    INTERACTION: 'interaction',
    SUCCESS: 'success',
    NEUTRAL: 'neutral',
};

export const SIZE = {
    SMALL: 'small',
    LARGE: 'large',
};

export function iconClassNames(props) {
    let { fill, size, stroke } = props;
    let className = classnames('mrc-ui-icon', 'mrc-ui-icon-' + size);
    let strokeClassName = classnames('mrc-ui-icon-stroke', 'mrc-ui-icon-stroke-' + stroke);
    let fillClassName = classnames('mrc-ui-icon-fill', 'mrc-ui-icon-fill-' + fill);
    return {
        className,
        strokeClassName,
        fillClassName,
    };
}

export const iconPropTypes = {
    fill: PropTypes.oneOf(['white', 'black', 'primary', 'interaction', 'success', 'neutral']),
    stroke: PropTypes.oneOf(['white', 'black', 'primary', 'interaction', 'success', 'neutral']),
    size: PropTypes.oneOf(['small', 'large']),
};
