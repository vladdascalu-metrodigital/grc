import './index.scss';
import React, { Component } from 'react';

export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSegment: 'star' + this.props.selectedIndex,
        };
    }

    onChange = e => {
        this.setState({
            selectedSegment: e.target.value,
        });
    };

    render() {
        const segments = [1, 2, 3, 4, 5]
            .map(i => 'star' + i)
            .map((x, i) => (
                <React.Fragment key={i}>
                    <input
                        type="radio"
                        name="form-type"
                        value={x}
                        id={'star' + i}
                        checked={this.state.selectedSegment === x}
                        onChange={this.onChange}
                    />
                    <label htmlFor={'star' + i}>{x}</label>
                </React.Fragment>
            ));
        return <div className="mrc-ui-input-star-rating">{segments.reverse()}</div>;
    }
}
