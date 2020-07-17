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
        return <div className="mrc-ui-action-dock">{this.props.children}</div>;
    }
}

export class SimpleActionDock extends PureComponent {
    render() {
        let cancelText = this.props.cancelText || lookup('mrc.cancel');
        let applyText = this.props.applyText || lookup('mrc.apply');
        return (
            <ActionDock>
                <FlexRow justifyContent="center" gap="medium">
                    <Button text={cancelText} isOutlined onClick={this.props.onCancel} wide="medium" />
                    <Button text={applyText} onClick={this.props.onApply} wide="medium" />
                </FlexRow>
            </ActionDock>
        );
    }
}

SimpleActionDock.propTypes = {
    onApply: PropTypes.func,
    applyText: PropTypes.string,
    onCancel: PropTypes.func,
    cancelText: PropTypes.string,
};
