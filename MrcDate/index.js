import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MrcDate extends PureComponent {
    render() {
        let { children: dateString } = this.props;
        let localeDateString = new Date(dateString).toLocaleDateString();
        return (
            <time dateTime={dateString} className="mrc-ui-date">
                {localeDateString}
            </time>
        );
    }
}

MrcDate.propTypes = {
    children: PropTypes.string,
};
