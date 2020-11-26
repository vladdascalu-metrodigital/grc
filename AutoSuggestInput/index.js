import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { lookup } from '../Util/translations';

import { STATUS, CHANGE_DELAY } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

import './index.scss';

export default class AutoSuggestInput extends Component {
    constructor(props) {
        super(props);
        this.validate.bind(this);
        this.delayedChangeTimeout = null;
        this.inputRef = React.createRef();
        this.state = {
            valid: true,
            validationMessages: [],
            suggestions: [],
        };
    }

    componentDidMount() {
        this.validate(this.props.value);
        if (this.props.autofocus) this.inputRef.current.focus();
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.validate(this.props.value);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.delayedChangeTimeout);
    }

    validate(v) {
        let { required, onValidChange } = this.props;
        let isValid = true;
        let nextValidationMessages = [];
        if (required && !v) {
            isValid = false;
            nextValidationMessages.push(lookup('mrc.forms.required'));
        }
        this.setState({
            valid: isValid,
            validationMessages: nextValidationMessages.length ? nextValidationMessages : [],
        });
        if (onValidChange && this.state && this.state.valid !== isValid) {
            onValidChange(isValid);
        }
        return isValid;
    }

    handleGetSuggestionValue = (suggestion) => {
        this.IS_GET_SUGGESTION = true;
        this.props.getSuggestionValue(suggestion);
    };

    handleChange = (e) => {
        // will be triggered by get suggestion value event
        if (this.IS_GET_SUGGESTION === true) {
            this.IS_GET_SUGGESTION = false;
            return;
        }

        let { onChange, onChangeDelayed, changeDelay } = this.props;
        let value = e.target.value;
        if (onChange) onChange(value);
        if (onChangeDelayed) {
            clearTimeout(this.delayedChangeTimeout);
            this.delayedChangeTimeout = setTimeout(() => onChangeDelayed(value), changeDelay || CHANGE_DELAY);
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.props.findSuggestions(value),
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    renderSuggestion = (suggestion) => {
        return <span>{suggestion}</span>;
    };

    render() {
        let {
            value,
            disabled,
            onBlur,
            status,
            label,
            validationMessages: messages,
            hideInvalid,
            placeholder,
        } = this.props;
        let { valid, validationMessages } = this.state;
        if (messages) validationMessages = [...validationMessages, ...messages];
        let inputClassName = classnames('mrc-ui-text-input-input', {
            'mrc-ui-text-input-input-invalid': !hideInvalid && (status === STATUS.INVALID || !valid),
        });

        const inputProps = {
            ref: this.inputRef,
            value: value,
            onChange: this.handleChange,
            type: 'text',
            className: inputClassName,
            disabled: disabled,
            onBlur: onBlur,
            placeholder: placeholder,
        };
        return (
            <div className="mrc-ui-text-input">
                <InputLabel>{label}</InputLabel>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.handleGetSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
                {!hideInvalid ? <InputValidationMessages messages={validationMessages} /> : null}
            </div>
        );
    }
}

AutoSuggestInput.propTypes = {
    autofocus: PropTypes.bool,
    changeDelay: PropTypes.number,
    disabled: PropTypes.bool,
    hideInvalid: PropTypes.bool,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeDelayed: PropTypes.func,
    onValidChange: PropTypes.func,
    required: PropTypes.bool,
    status: PropTypes.oneOf(['invalid']),
    validationMessages: PropTypes.array,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    getSuggestionValue: PropTypes.func,
    findSuggestions: PropTypes.func,
};
