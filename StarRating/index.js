import './index.scss';
import React, { Component } from 'react';

export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSegment: this.props.selectedIndex,
        };
    }

    onChange = e => {
        this.setState({
            selectedSegment: e.target.value,
        });
        this.props.onChange(e.target.value);
    };

    render() {
        const segments = ['1', '2', '3', '4', '5'].map(x => (
            <React.Fragment key={x}>
                <input
                    type="radio"
                    name="form-type"
                    value={x}
                    id={x}
                    checked={this.state.selectedSegment === x}
                    onChange={this.onChange}
                />
                <label htmlFor={x}>{x}</label>
            </React.Fragment>
        ));
        return <div className="mrc-ui-input-star-rating">{segments.reverse()}</div>;
    }
    a;
}
