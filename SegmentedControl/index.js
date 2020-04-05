import React, { Component } from 'react';
// import classnames from 'classnames';
// import { PropTypes } from 'prop-types';
// import { lookup } from '../Util/translations';
import './index.scss';

export default class SegmentedControl extends Component {
    render() {
        return (
            <div className="mrc-ui-segmented-control">
                <input type="radio" name="form-type" value="document" id="document" checked />
                <label htmlFor="document">Document</label>

                <input type="radio" name="form-type" value="placeholder" id="placeholder" />
                <label htmlFor="placeholder">Placeholder</label>
            </div>
        );
    }
}
