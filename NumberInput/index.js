import React, { Component } from 'react';
import classnames from 'classnames';
// import PropTypes from 'prop-types';

import './index.scss';

// TODO improve validation/regex - maybe allow even text, but show as invalid

export class NumberInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue == null || isNaN(props.initialValue) ? '' : props.initialValue + '',
            changed: false,
        };
        if (props.value) {
            // TODO accept value prop as prefilled value to align with other form components
            console.log('NumberInput should not be passed a value prop (will be ignored)');
        }
    }
    //deprecated, we use parseFloat instead, because these field should also accept float.
    parse(str) {
        return /^[0-9]+$/.test(str) ? Number(str) : NaN;
    }
    componentDidUpdate(prevProps) {
        if (
            this.props.shouldBePrefilledWith != null &&
            !Number.isNaN(this.props.shouldBePrefilledWith) &&
            !this.state.changed
        ) {
            this.handleChangeAmount(this.props.shouldBePrefilledWith);
        }
        if (this.props.shouldBePrefilledWith == null && this.state.changed) {
            this.handleChangeAmount('');
        }
        if (this.props.newValue !== prevProps.newValue && this.props.newValue != this.state.value) {
            this.handleChangeAmount(this.props.newValue);
        }
    }
    handleChange = event => {
        const str = event.target.value;
        const parsed = parseFloat(str);
        if (str.length === 0) {
            this.setState({ value: str });
            this.props.onChange(null);
        } else if (!Number.isNaN(parsed)) {
            this.setState({ value: str });
            this.props.onChange(parsed);
        }
    };
    handleChangeAmount = amount => {
        const str = amount;
        const parsed = parseFloat(str);
        if (str.length === 0) {
            this.setState({ value: str, changed: !this.state.changed });
            this.props.onChange(null);
        } else if (!Number.isNaN(parsed)) {
            this.setState({ value: str, changed: !this.state.changed });
            this.props.onChange(parsed);
        }
    };
    render() {
        const inputProps = { ...this.props };
        delete inputProps.value;
        delete inputProps.onChange;
        delete inputProps.initialValue;
        delete inputProps.shouldBePrefilledWith;
        let className = classnames('mrc-ui-number-input', inputProps.className);
        return (
            <input
                {...inputProps}
                className={className}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}

// let numberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

// NumberInput.propTypes = {
//     initialValue: numberOrStringType,
//     value: numberOrStringType,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     // and more
// };

export default NumberInput;
