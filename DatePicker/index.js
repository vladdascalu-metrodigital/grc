import React, { Component } from 'react';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import de from 'date-fns/locale/de';
import es from 'date-fns/locale/es';
import pt from 'date-fns/locale/pt';
import ru from 'date-fns/locale/ru';
import en from 'date-fns/locale/en-GB';
import hr from 'date-fns/locale/hr';
import ro from 'date-fns/locale/ro';
import pl from 'date-fns/locale/pl';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { lookup } from '../Util/translations';

import { COLOR as IC } from '../icons';
import CalendarIcon from '../icons/CalendarIcon';
import { STATUS, CHANGE_DELAY } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';

registerLocale('DE', de);
registerLocale('ES', es);
registerLocale('PT', pt);
// registerLocale('RS', rs);
registerLocale('RU', ru);
registerLocale('EN', en);
registerLocale('HR', hr);
registerLocale('RO', ro);
// registerLocale('PK', pk);
registerLocale('PL', pl);

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        setDefaultLocale((props.locale && props.locale.toUpperCase()) || 'EN');
        this.validate.bind(this);
        this.delayedChangeTimeout = null;
        this.state = {
            valid: true,
            validationMessages: [],
        };
    }

    componentDidMount() {
        this.validate(this.props.selected);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.selected, prevProps.selected)) {
            this.validate(this.props.selected);
        }
        if (this.props.locale !== prevProps.locale) {
            setDefaultLocale(this.props.locale);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.delayedChangeTimeout);
    }

    handleChange(value) {
        let { onChange, onChangeDelayed, changeDelay } = this.props;
        if (onChange) onChange(value);
        if (onChangeDelayed) {
            clearTimeout(this.delayedChangeTimeout);
            this.delayedChangeTimeout = setTimeout(() => onChangeDelayed(value), changeDelay || CHANGE_DELAY);
        }
    }

    validate(v) {
        let { required, onValidChange } = this.props;
        let isValid = true;
        let nextValidationMessages = [];
        if (!v && required) {
            isValid = false;
            nextValidationMessages.push(lookup('mrc.forms.required'));
        }
        if (
            this.state &&
            (this.state.valid !== isValid || !isEqual(this.state.validationMessages, nextValidationMessages))
        ) {
            this.setState({
                valid: isValid,
                validationMessages: nextValidationMessages.length ? nextValidationMessages : [],
            });
            if (onValidChange) onValidChange(isValid);
        }
        return isValid;
    }

    render() {
        let { valid, validationMessages } = this.state;
        let {
            selected,
            disabled,
            minDate,
            showYearDropdown,
            dateFormat,
            placeholderText,
            label,
            status,
            validationMessages: messages,
            hideInvalid,
        } = this.props;
        if (messages) validationMessages = [...validationMessages, ...messages];
        let className = classnames('mrc-ui-datepicker-input', {
            'mrc-ui-datepicker-input-invalid': !hideInvalid && (status === STATUS.INVALID || !valid),
        });
        return (
            <div className="mrc-ui-datepicker">
                <InputLabel>{label}</InputLabel>
                <div className="mrc-ui-datepicker-input-wrapper">
                    <ReactDatePicker
                        className={className}
                        onChange={this.handleChange.bind(this)}
                        selected={selected}
                        disabled={disabled}
                        minDate={minDate}
                        showYearDropdown={showYearDropdown}
                        dateFormat={dateFormat}
                        placeholderText={placeholderText}
                    />
                    <div className="mrc-ui-datepicker-icon">
                        <CalendarIcon size="xsmall" color={disabled ? IC.DISABLED : null} />
                    </div>
                </div>
                {!hideInvalid ? <InputValidationMessages messages={validationMessages} /> : null}
            </div>
        );
    }
}

DatePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeDelayed: PropTypes.func,
    changeDelay: PropTypes.number,
    selected: PropTypes.object,
    disabled: PropTypes.bool,
    minDate: PropTypes.object,
    showYearDropdown: PropTypes.bool,
    dateFormat: PropTypes.string,
    placeholderText: PropTypes.string,
    locale: PropTypes.string,
    status: PropTypes.oneOf(['invalid']),
    onValidChange: PropTypes.func,
    validationMessages: PropTypes.array,
    label: PropTypes.string,
    required: PropTypes.bool,
    hideInvalid: PropTypes.bool,
};
