import React, { Component } from 'react';
import { lookup } from '../Util/translations';
import ModalDialog from '../ModalDialog';
import StarRating from '../StarRating';
import Author from '../Author';
import './index.scss';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';

const intersperse = (xs, e) => _.initial(_.reduce(xs, (acc, x) => _.concat(acc, [x, e]), []));

export default class Recommendations extends Component {
    toggleModal = recommendation => {
        this.setState(prevState => ({
            isModalVisible: !prevState.isModalVisible,
            editedRecommendation: recommendation ? recommendation : null,
        }));
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            editedRecommendation: null,
        };
    }

    modalDialogContent() {
        return (
            <div>
                <p className="mrc-ui-form-text">{lookup('mrc.recommendations.description')}</p>
                <div className="mrc-ui-input-star-rating-component mrc-ui-input">
                    <label className="mrc-ui-label">{lookup('mrc.recommendations.rating')}</label>
                </div>
                <StarRating selectedIndex={_.get(this.state, 'editedRecommendation.rating')} />
                <div className="mrc-ui-input clear-both">
                    <label className="mrc-ui-label">{lookup('mrc.recommendations.text')}</label>
                    <textarea
                        className="mrc-ui-textarea"
                        value={
                            this.state.editedRecommendation
                                ? this.state.editedRecommendation.content
                                : this.props.newContent
                        }
                        onChange={e => this.props.onContentChange(e.target.value)}
                    ></textarea>
                </div>

                <div className="mrc-btn-group">
                    <button
                        type="button"
                        className="mrc-btn mrc-primary-button mrc-ui-button-small"
                        onClick={() => {
                            {
                                this.props.onSave(_.get(this.state, 'editedRecommendation.id'));
                            }
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
        const _recommendations = this.props.recommendations;
        const recommendations = _recommendations.map((recommendation, i) => (
            <div key={i} className="mrc-ui-recommendation">
                <Author
                    name={recommendation.uploaderName}
                    position={recommendation.uploaderPosition}
                    writeTime={recommendation.uploadTime}
                    additionalContent={this.starRatingResult(recommendation.rating)}
                />
                <div className="mrc-ui-recommendation-text">{recommendation.content}</div>
                {recommendation.canEdit ? (
                    <div className="mrc-btn-group">
                        <button
                            type="button"
                            className="mrc-btn mrc-primary-button mrc-ui-button-small"
                            onClick={() => {
                                this.toggleModal(recommendation);
                            }}
                        >
                            {lookup('mrc.recommendations.editrecommendation')}
                        </button>
                        <button
                            type="button"
                            className="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary mrc-ui-secondary-button-small-red"
                            onClick={() => this.props.onDelete(recommendation.id)}
                        >
                            {lookup('mrc.recommendations.deleterecommendation')}
                        </button>
                    </div>
                ) : null}
            </div>
        ));
        return (
            <div className="mrc-ui-recommendation-component">
                {this.props.canAddNew && !this.props.addNewDisabled ? (
                    <button
                        type="button"
                        className="mrc-primary-large-add-button"
                        onClick={this.toggleModal}
                        disabled={this.props.addNewDisabled}
                    >
                        {lookup('mrc.recommendations.addrecommendation')}
                    </button>
                ) : null}
                {_.isEmpty(recommendations) ? null : (
                    <div className="mrc-ui-recommendations">
                        <h3 className="mrc-ui-recommendations-headline">
                            {lookup('mrc.recommendations.recommendations')}
                        </h3>
                        <div className="mrc-ui-recommendations-list">
                            {intersperse(recommendations, <hr className="mrc-ui-recommendation-divider" />)}
                        </div>
                    </div>
                )}
                {this.state.isModalVisible ? (
                    <ModalDialog
                        toggle={this.toggleModal}
                        content={this.modalDialogContent()}
                        title={lookup('mrc.recommendations.modaltitle')}
                    />
                ) : null}
            </div>
        );
    }
}

Recommendations.propTypes = {
    onContentChange: PropTypes.func,
    onRatingChange: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    newContent: PropTypes.string,
    newRating: PropTypes.string,
    recommendations: PropTypes.array,
    canAddNew: PropTypes.bool,
    canEdit: PropTypes.bool,
    addNewDisabled: PropTypes.bool,
};
