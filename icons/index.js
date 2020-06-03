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
};

export const SIZE = {
    XSMALL: 'xsmall',
    SMALL: 'small',
};

export const STROKE_WIDTH = {
    MEDIUM: 'medium',
};

// provides classnames for the icons derived from the props
// so that all icons use the same pattern
export function iconClassNames(props) {
    let { fill, size, stroke, strokeWidth } = props;
    let wrapperClassName = classnames(
        'mrc-ui-icon-wrapper',
        stroke && 'mrc-ui-icon-wrapper-stroke-' + stroke,
        size && 'mrc-ui-icon-wrapper-size-' + size,
        {
            'mrc-ui-icon-wrapper-stroke-width-medium': strokeWidth === STROKE_WIDTH.MEDIUM,
        }
    );
    let svgClassName = classnames('mrc-ui-icon-svg', size && 'mrc-ui-icon-svg-size-' + size);
    let strokeClassName = classnames('mrc-ui-icon-stroke', stroke && 'mrc-ui-icon-stroke-' + stroke);
    let fillClassName = classnames('mrc-ui-icon-fill', fill && 'mrc-ui-icon-fill-' + fill);
    return {
        wrapperClassName,
        svgClassName,
        strokeClassName,
        fillClassName,
    };
}

export const iconPropTypes = {
    fill: PropTypes.oneOf(['white', 'black', 'interaction', 'success', 'neutral', 'danger', 'attention']),
    stroke: PropTypes.oneOf(['white', 'black', 'interaction', 'success', 'neutral', 'danger', 'attention']),
    strokeWidth: PropTypes.oneOf(['thin', 'medium']),
    size: PropTypes.oneOf(['small', 'xsmall']),
};
