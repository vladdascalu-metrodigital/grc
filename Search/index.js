import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { CHANGE_DELAY } from '../Util/inputCommons';
import { COLOR, SIZE } from '../icons/index';
import SearchIcon from '../icons/SearchIcon';
import InputLabel from '../InputLabel';

import './index.scss';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.delayedChangeTimeout = null;
        this.state = {
            showClearButton: false,
        };
    }

    componentWillUnmount() {
        clearTimeout(this.delayedChangeTimeout);
    }

    handleChange() {
        let { onChange, onChangeDelayed, changeDelay } = this.props;
        let value = this.inputRef.current.value;
        if (onChange) onChange(value);
        if (onChangeDelayed) {
            clearTimeout(this.delayedChangeTimeout);
            this.delayedChangeTimeout = setTimeout(() => onChangeDelayed(value), changeDelay || CHANGE_DELAY);
        }
        this.setState({
            showClearButton: !!value,
        });
    }

    handleEnterSearch(e) {
        let { onEnterSearch } = this.props;
        if ((e === true || e.keyCode == 13) && onEnterSearch) onEnterSearch(this.inputRef.current.value);
    }

    handleClear() {
        let { onEnterSearch } = this.props;
        this.inputRef.current.value = '';
        if (onEnterSearch) onEnterSearch(this.inputRef.current.value);
        this.setState({
            showClearButton: false,
        });
    }

    render() {
        let { placeholder, disabled, onBlur, label } = this.props;
        let { showClearButton } = this.state;
        let inputWrapperClassName = classnames('mrc-ui-search-input-wrapper', {
            'mrc-ui-search-input-wrapper-disabled': disabled,
        });
        return (
            <div className="mrc-ui-search">
                <InputLabel>{label}</InputLabel>
                <div className={inputWrapperClassName}>
                    <input
                        disabled={disabled}
                        ref={this.inputRef}
                        onKeyUp={this.handleEnterSearch.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        className="mrc-ui-search-input"
                        type="text"
                        placeholder={placeholder}
                        onBlur={onBlur}
                    />
                    {showClearButton && (
                        <div className="mrc-ui-search-clear">
                            <a onClick={this.handleClear.bind(this)}>clear</a>
                        </div>
                    )}
                    <div className="mrc-ui-search-icon">
                        <SearchIcon size={SIZE.XSMALL} color={disabled ? COLOR.DISABLED : COLOR.NEUTRAL} />
                    </div>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onChange: PropTypes.func,
    onChangeDelayed: PropTypes.func,
    changeDelay: PropTypes.number,
    onEnterSearch: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    label: PropTypes.string,
};
