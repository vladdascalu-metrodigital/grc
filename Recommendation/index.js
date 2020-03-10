import React, { Component } from 'react';
import './index.scss';
import { lookup } from '../Util/translations';
import Button from '../Button/index';
import PropTypes from 'prop-types';
import Rating from './Rating';

const abbreviationToExpandedPosition = {
    CM: 'Credit Manager',
    HOT: 'Head of Treasury',
    CC: 'Customer Consultant',
    HALJ: 'HAL Junior',
};

export default class Recommendation extends Component {
    withDeviceClass(cs) {
        return (this.props.mobile ? 'mobile' : 'desktop') + ' ' + cs;
    }

    newRecommendationInfo() {
        return (
            <div>
                <h3 className="recommendation span-metro-blue">{lookup('mrc.recommendations.recommendation')}</h3>
                <p className="description">{lookup('mrc.recommendations.description')}</p>
            </div>
        );
    }

    render() {
        if (this.props.currentlyEditing) {
            const content = this.props.content;
            return (
                <div
                    className={
                        /*eslint-disable*/
                        this.props.new
                            ? this.withDeviceClass('new-recommendation')
                            : this.withDeviceClass(
                                  'mrc-recommendation' +
                                      ' ' +
                                      (this.props.even ? 'mrc-recommendation-even' : 'mrc-recommendation-odd')
                              )
                        /*eslint-enable*/
                    }
                >
                    <h2 className={this.withDeviceClass('add-recommendation span-metro-blue')}>{this.props.title}</h2>
                    {this.props.new ? this.newRecommendationInfo() : null}
                    <Rating
                        className={this.withDeviceClass('mrc-rating')}
                        value={this.props.rating}
                        tag={this.props.id}
                        ratingChange={this.props.ratingChange}
                    />
                    <h3 className={this.withDeviceClass('span-metro-blue')}>{lookup('mrc.recommendations.text')}</h3>
                    <div className={this.withDeviceClass('m-input m-input-name')}>
                        <div className="m-input-elementWrapper">
                            <textarea
                                value={content ? content : ''}
                                onChange={e => this.props.contentChange(e.target.value)}
                                disabled={false}
                                className="m-input-element extra-class-on-input-tag"
                            />
                        </div>
                    </div>
                    <Button
                        text={this.props.savetext}
                        status="secondary"
                        onClick={() => this.props.save(this.props.id, this.props.content, this.props.rating)}
                    />
                </div>
            );
        } else {
            return (
                <div
                    className={
                        'mrc-recommendation' +
                        ' ' +
                        (this.props.even ? 'mrc-recommendation-even' : 'mrc-recommendation-odd')
                    }
                >
                    <h3 className={this.withDeviceClass('uploader-name span-metro-blue')}>{this.props.uploaderName}</h3>
                    <h3 className={this.withDeviceClass('uploader-position')}>
                        {abbreviationToExpandedPosition[this.props.uploaderPosition]}
                    </h3>
                    <br />
                    <p className={this.withDeviceClass(null)}>Rating: {this.props.rating}</p>
                    <br />
                    <div className={this.withDeviceClass('recommendation-text')}>{this.props.content}</div>
                    <div className={this.withDeviceClass('recommendation-footer')}>
                        {this.props.editableByCurrentUser ? (
                            <div className="mrc-btn-group">
                                <Button
                                    text={lookup('mrc.recommendations.deleterecommendation')}
                                    status="error"
                                    onClick={() => this.props.deleteRecommendation(this.props.id)}
                                />
                                <Button
                                    text={lookup('mrc.recommendations.editrecommendation')}
                                    status="primary"
                                    onClick={() =>
                                        this.props.editRecommendation(
                                            this.props.id,
                                            this.props.content,
                                            this.props.rating
                                        )
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            );
        }
    }
}

Recommendation.propTypes = {
    mobile: PropTypes.bool,
    save: PropTypes.func,
    deleteRecommendation: PropTypes.func,
    editRecommendation: PropTypes.func,
    ratingChange: PropTypes.func,
    contentChange: PropTypes.func,
    uploaderName: PropTypes.string,
    uploaderPosition: PropTypes.string,
    text: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
    rating: PropTypes.string,
    currentlyEditing: PropTypes.bool,
    new: PropTypes.bool,
    title: PropTypes.string,
    savetext: PropTypes.string,
    even: PropTypes.bool,
    editableByCurrentUser: PropTypes.bool,
};
