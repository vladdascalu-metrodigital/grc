import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ToggleIndicator from '../ToggleIndicator';

import './index.scss';

export default class ToggleBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.initialShow,
        };
    }

    toggle() {
        this.setState({
            show: !this.state.show,
        });
    }

    render() {
        let { children, titleContent } = this.props;
        let { show } = this.state;
        let stripClassName = classnames('mrc-ui-toggle-box-strip', {
            'mrc-ui-toggle-box-strip-toggled': show,
        });
        return (
            <div className="mrc-ui-toggle-box">
                <div onClick={() => this.toggle()} className={stripClassName}>
                    <div className="mrc-ui-toggle-box-title-content">{titleContent}</div>
                    <ToggleIndicator tilt={show} />
                </div>
                {show && <div className="mrc-ui-toggle-box-content">{children}</div>}
            </div>
        );
    }
}

ToggleBox.defaultProps = {
    initialShow: false,
};

ToggleBox.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    initialShow: PropTypes.bool,
    titleContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
