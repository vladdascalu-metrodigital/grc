import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MrcDateTime extends PureComponent {
    render() {
        let { children: datetimeString } = this.props;
        let localeDateString = datetimeString ? new Date(datetimeString).toLocaleString() : null;
        return (
            <time dateTime={datetimeString} className="mrc-ui-datetime">
                {localeDateString}
            </time>
        );
    }
}

MrcDateTime.propTypes = {
    children: PropTypes.string,
};
