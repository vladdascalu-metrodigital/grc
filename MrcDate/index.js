import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MrcDate extends PureComponent {
    render() {
        let { children: dateString } = this.props;
        let localeDateString = new Date(dateString).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
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
