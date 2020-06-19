import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

export default class RadioButtons extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    handleChange(value, e) {
        let { onChange } = this.props;
        if ((e === 'click' || e.keyCode == 13 || e.keyCode == 32) && onChange) onChange(value);
    }

    render() {
        let { value, options, disabled } = this.props;
        let className = classnames('mrc-ui-radiobuttons', {
            'mrc-ui-radiobuttons-disabled': disabled,
        });
        return (
            <div className={className}>
                {options.map((option, i) => {
                    let optionValue, optionText;
                    if (Array.isArray(option)) {
                        optionValue = option[0];
                        optionText = option[1];
                    } else {
                        optionValue = option;
                        optionText = option;
                    }
                    let checkedClassName = value === optionValue ? ' mrc-ui-radiobuttons-box-checked' : '';
                    return (
                        <div
                            key={i}
                            onKeyUp={this.handleChange.bind(this, optionValue)}
                            onClick={this.handleChange.bind(this, optionValue, 'click')}
                            tabIndex="0"
                        >
                            <div className={'mrc-ui-radiobuttons-box' + checkedClassName}></div>
                            {optionText}
                        </div>
                    );
                })}
            </div>
        );
    }
}

let numberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

RadioButtons.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: numberOrStringType,
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(numberOrStringType),
    ]),
};
