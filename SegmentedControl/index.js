import React, { Component } from 'react';
// import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import './index.scss';

export default class SegmentedControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSegment: this.props.selectedSegment,
        };
    }

    handleSegmentChange = changeEvent => {
        this.setState({
            selectedSegment: changeEvent.target.value,
        });
    };

    render() {
        const labels = ['Document', 'Placeholder', 'bar', 'baz', 'foobar'];
        const segments = labels.map((value, index) => {
            const segmentId = 'segment-' + index;
            return (
                <>
                    <input
                        type="radio"
                        name="form-type"
                        value={value}
                        id={segmentId}
                        checked={this.state.selectedSegment === value}
                        onChange={this.handleSegmentChange}
                    />
                    <label htmlFor={segmentId}>{value}</label>
                </>
            );
        });

        return <div className="mrc-ui-segmented-control">{segments}</div>;
    }
}

SegmentedControl.propTypes = {
    onSegmentChange: PropTypes.func,
    selectedSegment: PropTypes.string,
    labels: PropTypes.array,
};
