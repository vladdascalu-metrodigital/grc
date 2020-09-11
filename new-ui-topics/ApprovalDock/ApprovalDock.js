import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ActionDock from '../../ActionDock';
import ModalDialog from '../../ModalDialog';
import { FlexRow, FlexColumn } from '../../Flex';
import Grid from '../../Grid';
import Button from '../../Button';
import TextArea from '../../TextArea';
import CheckCard from '../../CheckCard';
import InputLabel from '../../InputLabel';

import './ApprovalDock.scss';

const recipients = new Map([
    ['CC', 'Customer Consultant'],
    ['CM', 'Credit Manager'],
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
        let {
            process,
            onApprove,
            onCancel,
            onBlock,
            onReject,
            onSendInfoRequest,
            onProvide,
            onForward,
            onConfirm,
        } = this.props;
        let { infoRequestModalOpen, infoRequestFormData } = this.state;
        return (
            <React.Fragment>
                <ActionDock className="mrc-ui-approval-dock">
                    {!process.supportsProvideInfo && !process.supportsConfirm && process.editableByCurrentUser ? (
                        <Button
                            text="Request Info"
                            id="mrc-ui-approval-dock-btn-request"
                            onClick={this.toggleInfoRequestmodal}
                        />
                    ) : null}

                    {process.supportsApprove ? (
                        <Button
                            text="Reject"
                            id="mrc-ui-approval-dock-btn-reject"
                            wide="small"
                            color="danger"
                            onClick={onReject}
                            isOutlined
                        />
                    ) : null}

                    {process.supportsBlock ? (
                        <Button
                            text="Block"
                            id="mrc-ui-approval-dock-btn-block"
                            wide="small"
                            color="danger"
                            onClick={onBlock}
                        />
                    ) : null}

                    <Button
                        text="Cancel"
                        id="mrc-ui-approval-dock-btn-cancel"
                        wide="small"
                        color="success"
                        onClick={onCancel}
                        isOutlined
                    />

                    {process.supportsApprove ? (
                        <Button
                            text="Approve"
                            id="mrc-ui-approval-dock-btn-approve"
                            wide="small"
                            color="success"
                            onClick={onApprove}
                        />
                    ) : null}

                    {process.supportsProvide ? (
                        <Button
                            text="Provide"
                            id="mrc-ui-approval-dock-btn-provide"
                            wide="small"
                            color="success"
                            onClick={onProvide}
                        />
                    ) : null}

                    {process.supportsForwarding ? (
                        <Button
                            text="Forward"
                            id="mrc-ui-approval-dock-btn-forward"
                            wide="small"
                            color="success"
                            onClick={onForward}
                        />
                    ) : null}

                    {process.supportsConfirm ? (
                        <Button
                            text="Confirm"
                            id="mrc-ui-approval-dock-btn-confirm"
                            wide="small"
                            color="success"
                            onClick={onConfirm}
                        />
                    ) : null}
                </ActionDock>
                {infoRequestModalOpen && (
                    <ModalDialog title="Request Additional Info" toggle={this.toggleInfoRequestmodal}>
                        <FlexColumn gap="medium">
                            <div>
                                <InputLabel>Choose a Recipient</InputLabel>
                                <Grid gap="small" cols={4}>
                                    {Array.from(recipients).map(([k, v]) => (
                                        <CheckCard
                                            key={k}
                                            title={v}
                                            size="small"
                                            checked={infoRequestFormData.recipient == k}
                                            onClick={() => this.setInfoRequestFormData('recipient', k)}
                                        />
                                    ))}
                                </Grid>
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
    process: PropTypes.object.isRequired,

    onApprove: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onBlock: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    onProvide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onForward: PropTypes.func.isRequired,
    onSendInfoRequest: PropTypes.func.isRequired,
};
