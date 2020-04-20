import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = props => {
    const width = props.width ? props.width : '100%';
    if (props.src === undefined) {
        return null;
    }

    return (
        <video width={width} controls preload="metadata">
            <source src={props.src} />
            Your browser does not support the video tag.
        </video>
    );
};

VideoPlayer.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
};

export default VideoPlayer;
