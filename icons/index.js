import classnames from 'classnames';
import PropTypes from 'prop-types';

export const COLOR = {
    CONTRAST_WHITE: 'white',
    CONTRAST_BLACK: 'black',
    INTERACTION: 'interaction',
    SUCCESS: 'success',
    NEUTRAL: 'neutral',
    DANGER: 'danger',
    ATTENTION: 'attention',
    MUTED: 'muted',
    DISABLED: 'disabled',
    LIGHT_RED: 'light-red',
};

export const SIZE = {
    XSMALL: 'xsmall',
    SMALL: 'small',
    SIDEBAR: 'sidebar',
};

export const STROKE_WIDTH = {
    MEDIUM: 'medium',
};

// provides classnames for the icons derived from the props
// so that all icons use the same pattern
export function iconClassNames(props) {
    let { fill, size, stroke, strokeWidth, color } = props;
    let circleClassName = classnames(
        'mrc-ui-icon-circle',
        color && 'mrc-ui-icon-circle-color-' + color,
        size && 'mrc-ui-icon-circle-size-' + size,
        {
            'mrc-ui-icon-circle-width-medium': strokeWidth === STROKE_WIDTH.MEDIUM,
        }
    );
    let svgClassName = classnames('mrc-ui-icon-svg', size && 'mrc-ui-icon-svg-size-' + size);
    let colorToStrokeClassName = classnames(
        'mrc-ui-icon-stroke',
        stroke && 'mrc-ui-icon-stroke-' + stroke,
        color && 'mrc-ui-icon-stroke-' + color
    );
    let colorToFillClassName = classnames(
        'mrc-ui-icon-fill',
        fill && 'mrc-ui-icon-fill-' + fill,
        color && 'mrc-ui-icon-fill-' + color
    );

    return {
        circleClassName,
        svgClassName,
        colorToStrokeClassName,
        colorToFillClassName,
    };
}

export const iconPropTypes = {
    color: PropTypes.oneOf([
        'white',
        'black',
        'interaction',
        'success',
        'neutral',
        'danger',
        'attention',
        'muted',
        'disabled',
        'light-red',
    ]),
    strokeWidth: PropTypes.oneOf(['thin', 'medium']),
    size: PropTypes.oneOf(['small', 'xsmall']),
};
