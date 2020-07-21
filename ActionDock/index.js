import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

import { FlexRow } from '../Flex';
import Button from '../Button';

import './index.scss';

export default class ActionDock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = this.props.className ? 'mrc-ui-action-dock ' + this.props.className : 'mrc-ui-action-dock';
        return <div className={className}>{this.props.children}</div>;
    }
}

ActionDock.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export class SimpleActionDock extends PureComponent {
    render() {
        let cancelText = this.props.cancelText || lookup('mrc.cancel');
        let applyText = this.props.applyText || lookup('mrc.apply');
        return (
            <ActionDock>
                <FlexRow justifyContent="center" gap="medium">
                    <Button
                        text={cancelText}
                        isOutlined
                        onClick={this.props.onCancel}
                        wide="medium"
                        disabled={this.props.cancelDisabled}
                    />
                    <Button
                        text={applyText}
                        onClick={this.props.onApply}
                        wide="medium"
                        disabled={this.props.applyDisabled}
                    />
                </FlexRow>
            </ActionDock>
        );
    }
}

SimpleActionDock.propTypes = {
    onApply: PropTypes.func,
    applyDisabled: PropTypes.bool,
    applyText: PropTypes.string,
    onCancel: PropTypes.func,
    cancelDisabled: PropTypes.bool,
    cancelText: PropTypes.string,
};
