import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import PropTypes from 'prop-types';

export default class MrcDatePickerInput extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedDate: props.selected ? props.selectedDate : null };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date,
        });
        this.props.onChange(date);
    }

    render() {
        const inputProps = { ...this.props };
        delete inputProps.onChange;
        return <DatePicker onChange={this.handleChange} {...this.props} />;
    }
}

MrcDatePickerInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    selected: PropTypes.object,
    disabled: PropTypes.bool,
    minDate: PropTypes.object,
    showYearDropdown: PropTypes.bool,
    dateFormat: PropTypes.string,
    placeholderText: PropTypes.string,
    selectedDate: PropTypes.object,
};
