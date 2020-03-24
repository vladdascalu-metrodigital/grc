import React, { Component } from 'react';
import { lookup } from 'global-react-components/Util/translations';
import ModalDialog from '../ModalDialog';
import Author from '../Author';
import './index.scss';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';

const intersperse = (xs, e) => _.initial(_.reduce(xs, (acc, x) => _.concat(acc, [x, e]), []));

export default class Recommendations extends Component {
    toggleModal = () => {
        this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    modalDialogContent() {
        return (
            <div>
                <p className="mrc-ui-form-text">{lookup('mrc.recommendations.description')}</p>

                <div className="mrc-ui-input-star-rating-component mrc-ui-input">
                    <label className="mrc-ui-label">{lookup('mrc.recommendations.rating')}</label>
                    <div className="mrc-ui-input-star-rating">
                        <input
                            type="radio"
                            id="star5"
                            name="rate"
                            value="5"
                            onClick={() => this.props.onRatingChange('5')}
                        />
                        <label htmlFor="star5" title="text">
                            1 star
                        </label>
                        <input
                            type="radio"
                            id="star4"
                            name="rate"
                            value="4"
                            onClick={() => this.props.onRatingChange('4')}
                        />
                        <label htmlFor="star4" title="text">
                            2 stars
                        </label>
                        <input
                            type="radio"
                            id="star3"
                            name="rate"
                            value="3"
                            onClick={() => this.props.onRatingChange('3')}
                        />
                        <label htmlFor="star3" title="text">
                            3 stars
                        </label>
                        <input
                            type="radio"
                            id="star2"
                            name="rate"
                            value="2"
                            onClick={() => this.props.onRatingChange('2')}
                        />
                        <label htmlFor="star2" title="text">
                            4 stars
                        </label>
                        <input
                            type="radio"
                            id="star1"
                            name="rate"
                            value="1"
                            onClick={() => this.props.onRatingChange('1')}
                        />
                        <label htmlFor="star1" title="text">
                            5 stars
                        </label>
                    </div>
                </div>
                <div className="mrc-ui-input clear-both">
                    <label className="mrc-ui-label">{lookup('mrc.recommendations.text')}</label>
                    <textarea
                        className="mrc-ui-textarea"
                        value={this.props.newContent}
                        onChange={e => this.props.onContentChange(e.target.value)}
                    ></textarea>
                </div>

                <div className="mrc-btn-group">
                    <button
                        type="button"
                        className="mrc-btn mrc-primary-button mrc-ui-button-small"
                        onClick={() => {
                            this.props.onSave(this.props.newContent, this.props.newRating);
                            this.toggleModal();
                        }}
                    >
                        {lookup('mrc.recommendations.save')}
                    </button>
                    <button
                        type="button"
                        className="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary"
                        onClick={this.toggleModal}
                    >
                        {lookup('mrc.recommendations.cancel')}
                    </button>
                </div>
            </div>
        );
    }

    starRatingResult(rating) {
        const filledStars = _.times(rating, _.constant(<span className="mrc-ui-filled-star">★</span>));
        const unfilledStars = _.times(5 - rating, _.constant(<span className="mrc-ui-star-placeholder">☆</span>));
        return (
            <div className="mrc-ui-recommendation-star-rating">
                {filledStars}
                {unfilledStars}
            </div>
        );
    }

    render() {
        let recommendations = null;
        if (this.props.contents && this.props.ratings) {
            const ratings = this.props.ratings;
            recommendations = this.props.contents
                .map(function(x, i) {
                    return [x, ratings[i]];
                })
                .map((contentAndRating, i) => {
                    let [content, rating] = contentAndRating;
                    return (
                        <div key={i} className="mrc-ui-recommendation">
                            <Author additionalContent={this.starRatingResult(rating)} />
                            <div className="mrc-ui-recommendation-text">{content}</div>
                        </div>
                    );
                });
        }

        return (
            <div className="mrc-ui-recommendation-component">
                <button
                    type="button"
                    className="mrc-primary-button mrc-ui-add-recommendation-button"
                    onClick={this.toggleModal}
                >
                    {lookup('mrc.recommendations.addrecommendation')}
                </button>
                <div className="mrc-ui-recommendations">
                    <h3 className="mrc-ui-recommendations-headline">{lookup('mrc.recommendations.recommendations')}</h3>
                    <div className="mrc-ui-recommendations-list">
                        {intersperse(recommendations, <hr className="mrc-ui-recommendation-divider" />)}
                    </div>
                </div>
                {this.state.isModalVisible ? (
                    <ModalDialog toggle={this.toggleModal} content={this.modalDialogContent()} />
                ) : null}
            </div>
        );
    }
}

Recommendations.propTypes = {
    onContentChange: PropTypes.func,
    onRatingChange: PropTypes.func,
    onSave: PropTypes.func,
    ratings: PropTypes.array,
    contents: PropTypes.array,
    newContent: PropTypes.string,
    newRating: PropTypes.string,
};
