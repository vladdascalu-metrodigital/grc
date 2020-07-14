import React, { Component } from 'react';

import { FlexRow } from '../Flex';
import './index.scss';

import PropTypes from 'prop-types';

import Button from '../Button';

export default class ActionDock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mrc-ui-action-dock">{this.props.children}</div>;
    }
}

export class SimpleActionDock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ActionDock>
                <FlexRow justifyContent="center" gap="medium">
                    <Button text="Cancel" color="danger" isOutlined onClick={this.props.onCancel} wide="medium" />
                    <Button text="Apply" onClick={this.props.onApply} wide="medium" />
                </FlexRow>
            </ActionDock>
        );
    }
}

SimpleActionDock.propTypes = {
    onApply: PropTypes.func,
    onCancel: PropTypes.func,
};
