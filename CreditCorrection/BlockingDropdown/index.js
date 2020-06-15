import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ChevronDownIcon from '../../icons/chevron-down.svg';
import { lookup } from '../../Util/translations';

export default class BlockingDropdown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.forceUpdate();
        }
    }

    onChangeDropdown = e => {
        var options = e.target.options !== undefined ? e.target.options : [];
        var values = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                if (options[i].value !== undefined && options[i].value.length > 0) {
                    values.push(options[i].value);
                }
            }
        }
        const newValue = values.length > 0 ? values[0] : undefined;
        this.setState({ value: newValue });
        this.props.updateDropdownValue(this.props.id, newValue);
    };

    render() {
        const options = this.props.options || [];
        const className =
            this.props.id === 'groupLevel'
                ? 'mrc-input blockingDropdownGroupLevel'
                : 'mrc-input blockingDropdownCustomerLevel';
        return (
            <div className={className}>
                <label>{lookup(this.props.label)}</label>
                <select
                    {...this.props}
                    name="blockingDropdown"
                    className="m-input-element"
                    onChange={this.onChangeDropdown}
                >
                    {options.map(option => {
                        return (
                            <option key={option} value={option}>
                                {lookup(option)}
                            </option>
                        );
                    })}
                    ;
                </select>
                <img
                    htmlFor={'creditproduct-' + this.props.id}
                    className="mrc-icon-small mrc-down-icon"
                    src={ChevronDownIcon}
                />
            </div>
        );
    }
}

BlockingDropdown.propTypes = {
    updateDropdownValue: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
};
