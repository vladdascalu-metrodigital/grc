import React, { Component } from 'react';
import { lookup } from 'global-react-components/Util/translations';
import RadioButton from '../RadioButton';
import PropTypes from 'prop-types';

export default class Rating extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <label>{lookup('mrc.recommendations.rating')}</label>
                <RadioButton
                    label="5"
                    checked={this.props.value === '5'}
                    onClick={() => {
                        this.props.ratingChange('5');
                    }}
                    onChange={() => {
                        this.props.ratingChange('5');
                    }}
                />
                <RadioButton
                    label="4"
                    checked={this.props.value === '4'}
                    onClick={() => {
                        this.props.ratingChange('4');
                    }}
                    onChange={() => {
                        this.props.ratingChange('4');
                    }}
                />
                <RadioButton
                    label="3"
                    checked={this.props.value === '3'}
                    onClick={() => {
                        this.props.ratingChange('3');
                    }}
                    onChange={() => {
                        this.props.ratingChange('3');
                    }}
                />
                <RadioButton
                    label="2"
                    checked={this.props.value === '2'}
                    onClick={() => {
                        this.props.ratingChange('2');
                    }}
                    onChange={() => {
                        this.props.ratingChange('2');
                    }}
                />
                <RadioButton
                    label="1"
                    checked={this.props.value === '1'}
                    onClick={() => {
                        this.props.ratingChange('1');
                    }}
                    onChange={() => {
                        this.props.ratingChange('1');
                    }}
                />
            </div>
        );
    }
}

Rating.propTypes = {
    ratingChange: PropTypes.funciton,
    value: PropTypes.string,
    className: PropTypes.string,
};
