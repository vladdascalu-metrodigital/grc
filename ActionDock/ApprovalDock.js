import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ActionDock from './index';
import ModalDialog from '../ModalDialog';
import { FlexRow, FlexColumn } from '../Flex';
import Button from '../Button';
import TextArea from '../TextArea';
import CheckCard from '../CheckCard';
import InputLabel from '../InputLabel';

import './ApprovalDock.scss';

const recipients = new Map([
    ['CC', 'CC'],
    ['CM', 'CM'],
]);

export default class ApprovalDock extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleInfoRequestmodal = this.toggleInfoRequestmodal.bind(this);
        this.setInfoRequestFormData = this.setInfoRequestFormData.bind(this);
        this.state = {
            infoRequestModalOpen: false,
            infoRequestFormData: {
                recipient: 'CC',
                message: '',
            },
        };
    }

    toggleInfoRequestmodal() {
        this.setState({
            infoRequestModalOpen: !this.state.infoRequestModalOpen,
        });
    }

    setInfoRequestFormData(k, v) {
        let newState = {
            ...this.state,
            infoRequestFormData: {
                ...this.state.infoRequestFormData,
                [k]: v,
            },
        };
        this.setState(newState);
    }

    render() {
        let { onApprove, onCancel, onBlock, onReject, onSendInfoRequest } = this.props;
        let { infoRequestModalOpen, infoRequestFormData } = this.state;
        return (
            <React.Fragment>
                <ActionDock className="mrc-ui-approval-dock">
                    <Button text="Request Info" onClick={this.toggleInfoRequestmodal} />
                    <Button wide="small" text="Reject" color="danger" onClick={onReject} isOutlined />
                    <Button wide="small" text="Block" color="danger" onClick={onBlock} />
                    <Button wide="small" text="Cancel" color="success" onClick={onCancel} isOutlined />
                    <Button wide="small" text="Approve" color="success" onClick={onApprove} />
                </ActionDock>
                {infoRequestModalOpen && (
                    <ModalDialog title="Request Additional Info" toggle={this.toggleInfoRequestmodal}>
                        <FlexColumn gap="medium">
                            <div>
                                <InputLabel>Choose a Recipient</InputLabel>
                                <FlexRow gap="small">
                                    {Array.from(recipients).map(([k, v]) => (
                                        <CheckCard
                                            key={k}
                                            title={v}
                                            size="small"
                                            checked={infoRequestFormData.recipient == k}
                                            onClick={() => this.setInfoRequestFormData('recipient', k)}
                                        />
                                    ))}
                                </FlexRow>
                            </div>
                            <TextArea
                                label="Comment"
                                value={infoRequestFormData.message}
                                onChange={(v) => this.setInfoRequestFormData('message', v)}
                            />
                            <FlexRow justifyContent="flex-end" gap="medium">
                                <Button text="Cancel" onClick={this.toggleInfoRequestmodal} isOutlined />
                                <Button text="Send" onClick={() => onSendInfoRequest(infoRequestFormData)} />
                            </FlexRow>
                        </FlexColumn>
                    </ModalDialog>
                )}
            </React.Fragment>
        );
    }
}

ApprovalDock.propTypes = {
    onApprove: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onBlock: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    onSendInfoRequest: PropTypes.func.isRequired,
};
