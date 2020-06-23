import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { COLOR, SIZE } from '../icons/index';
import SearchIcon from '../icons/SearchIcon';

import './index.scss';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            showClearButton: false,
        };
    }

    handleChange() {
        let { onChange } = this.props;
        if (onChange) onChange(this.inputRef.current.value);
        this.setState({
            showClearButton: !!this.inputRef.current.value,
        });
    }

    handleEnterSearch(e) {
        let { onEnterSearch } = this.props;
        if (e.keyCode == 13 && onEnterSearch) onEnterSearch(this.inputRef.current.value);
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
        let { placeholder } = this.props;
        let { showClearButton } = this.state;
        return (
            <div className="mrc-ui-search">
                <input
                    ref={this.inputRef}
                    onKeyUp={this.handleEnterSearch.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    className="mrc-ui-search-input"
                    type="text"
                    placeholder={placeholder}
                />
                {showClearButton && (
                    <div className="mrc-ui-search-clear">
                        <a onClick={this.handleClear.bind(this)}>clear</a>
                    </div>
                )}
                <div className="mrc-ui-search-icon">
                    <SearchIcon size={SIZE.XSMALL} color={COLOR.NEUTRAL} />
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onChange: PropTypes.func,
    onEnterSearch: PropTypes.func,
    placeholder: PropTypes.string,
};
