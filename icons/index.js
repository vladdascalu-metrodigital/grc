import classnames from 'classnames';
import PropTypes from 'prop-types';

export const COLOR = {
    CURRENT_COLOR: 'current-color',

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
    INLINE: 'inline',
};

export const STROKE_WIDTH = {
    MIDI: 'midi',
    MEDIUM: 'medium',
};

// provides classnames for the icons derived from the props
// so that all icons use the same pattern
export function iconClassNames(props) {
    let { fill, size, stroke, strokeWidth, color } = props;
    let circleClassName = classnames(
        'mrc-ui-icon mrc-ui-icon-circle',
        size && 'mrc-ui-icon-size-' + size,
        color && 'mrc-ui-icon-circle-color-' + color,
        strokeWidth && 'mrc-ui-icon-circle-color-' + strokeWidth,
        {
            'mrc-ui-icon mrc-ui-icon-circle-width-medium': strokeWidth === STROKE_WIDTH.MEDIUM,
            'mrc-ui-icon mrc-ui-icon-circle-width-midi': strokeWidth === STROKE_WIDTH.MIDI,
        }
    );

    let svgClassName = classnames('mrc-ui-icon-svg', size && 'mrc-ui-icon-size-' + size);
    let widthToStrokeClassName = classnames(strokeWidth && 'mrc-ui-icon-stroke-width-' + strokeWidth);
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
        widthToStrokeClassName,
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
        'current-color',
    ]),
    strokeWidth: PropTypes.oneOf(['thin', 'medium', 'midi']),
    size: PropTypes.oneOf(['small', 'xsmall', 'inline']),
};
