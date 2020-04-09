import './index.scss';
import React, { Component } from 'react';

export default class StarRating extends Component {
    render() {
        return (
            <div className="mrc-ui-input-star-rating">
                <input type="radio" id="star5" name="rate" value="5" onClick={() => this.props.onRatingChange('5')} />
                <label htmlFor="star5" title="text">
                    1 star
                </label>
                <input type="radio" id="star4" name="rate" value="4" onClick={() => this.props.onRatingChange('4')} />
                <label htmlFor="star4" title="text">
                    2 stars
                </label>
                <input type="radio" id="star3" name="rate" value="3" onClick={() => this.props.onRatingChange('3')} />
                <label htmlFor="star3" title="text">
                    3 stars
                </label>
                <input type="radio" id="star2" name="rate" value="2" onClick={() => this.props.onRatingChange('2')} />
                <label htmlFor="star2" title="text">
                    4 stars
                </label>
                <input type="radio" id="star1" name="rate" value="1" onClick={() => this.props.onRatingChange('1')} />
                <label htmlFor="star1" title="text">
                    5 stars
                </label>
            </div>
        );
    }
}
