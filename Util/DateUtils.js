import React from 'react';
import Moment from 'react-moment';
import './util.css';
import * as _ from 'lodash';

export default function printDate(date, withRelative = true) {
    if (!date || _.isEmpty(date)) {
        return null;
    }
    return (
        <span className="date-util-style">
            <Moment className="absolute" format="LL">
                {date}
            </Moment>
            &nbsp;
            {withRelative && (
                <Moment className="relative" fromNow={true}>
                    {date}
                </Moment>
            )}
        </span>
    );
}
