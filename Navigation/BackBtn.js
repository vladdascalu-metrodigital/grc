import React, { Component } from "react";
import ArrowLeft from "../icons/arrow-left.svg";
import PropTypes from "prop-types";

export default class BackBtn extends Component {

    // For later:
    // import {NavLink} from 'react-router-dom';
    // <NavLink to='' className='btn'></NavLink>

    constructor(props) {
        super(props);
        // this.navBack = this.navBack.bind(this);
    }

    navBack = () => {
        window.history.back();
        if (this.props.onClick) this.props.onClick();
    };

    render() {
        if (this.props.disabled) return null;
        return (
            <a className='btn' onClick={this.navBack}>
                <img className='m-icon-medium' src={ArrowLeft} alt='Back' />
            </a>
        );
    }

}

BackBtn.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};
