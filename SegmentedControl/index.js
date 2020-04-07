import React, { Component } from 'react';
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
        const labels = this.props.labels;
        const segments = labels.map((value, index) => {
            const segmentId = 'segment-' + index;
            return (
                <React.Fragment key={'segmentedInput' + index}>
                    <input
                        type="radio"
                        name="form-type"
                        value={value}
                        id={segmentId}
                        checked={this.state.selectedSegment === value}
                        onChange={this.handleSegmentChange}
                    />
                    <label htmlFor={segmentId}>{value}</label>
                </React.Fragment>
            );
        });

        return <div className={`mrc-ui-${this.props.labels.length}-segmented-control`}>{segments}</div>;
    }
}

SegmentedControl.propTypes = {
    onSegmentChange: PropTypes.func,
    selectedSegment: PropTypes.string,
    labels: PropTypes.array,
};
