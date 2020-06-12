import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SelectIcon from '../icons/SelectIcon';

import './index.scss';

export default class Select extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        let { onChange } = this.props;
        if (onChange) onChange(e.target.value);
    }

    render() {
        let { value, options } = this.props;
        return (
            <div className="mrc-ui-select">
                <select className="mrc-ui-select-input" value={value} onChange={this.handleChange.bind(this)}>
                    {options.map((option, i) => {
                        let optionValue, optionText;
                        if (Array.isArray(option)) {
                            optionValue = option[0];
                            optionText = option[1];
                        } else {
                            optionValue = option;
                            optionText = option;
                        }
                        return (
                            <option value={optionValue} key={i}>
                                {optionText}
                            </option>
                        );
                    })}
                </select>
                <div className="mrc-ui-select-icon">
                    <SelectIcon size="xsmall" />
                </div>
            </div>
        );
    }
}

let numberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Select.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(numberOrStringType),
    ]),
    value: numberOrStringType,
    onChange: PropTypes.func,
};
