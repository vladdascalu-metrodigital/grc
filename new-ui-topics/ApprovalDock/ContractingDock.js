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

import './ContractingDock.scss';

export default class ContractingDock extends PureComponent {
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
        let { currentStepType, onCancel, onValidateContract, onSignContract, onSendInfoRequest } = this.props;
        let { infoRequestModalOpen, infoRequestFormData } = this.state;
        return (
            <React.Fragment>
                <ActionDock className="mrc-ui-contracting-dock">
                    {currentStepType === 'CONTRACT_VALIDATION' ? (
                        <Button
                            id="mrc-ui-contracting-dock-request-btn"
                            text="Weitere Informationen anfragen"
                            color=""
                            onClick={this.toggleInfoRequestmodal}
                        />
                    ) : null}

                    <Button
                        id="mrc-ui-contracting-dock-cancel-btn"
                        text="Anfrage Abbrechen"
                        color="success"
                        onClick={onCancel}
                        isOutlined
                    />

                    {currentStepType === 'CONTRACT_SIGNING' ? (
                        <Button
                            id="mrc-ui-contracting-dock-sign-btn"
                            text="An Vertragsmanagement senden"
                            color="success"
                            onClick={onSignContract}
                        />
                    ) : (
                        <Button
                            id="mrc-ui-contracting-dock-validate-btn"
                            text="Vertrag validieren"
                            color="success"
                            onClick={onValidateContract}
                        />
                    )}
                </ActionDock>
                {infoRequestModalOpen && (
                    <ModalDialog title="Request Additional Info from CC" toggle={this.toggleInfoRequestmodal}>
                        <FlexColumn gap="medium">
                            <InputLabel>Recipient</InputLabel>
                            <Grid gap="small" cols={4}>
                                <CheckCard title={'Customer Consultant'} size="small" checked={true} />
                            </Grid>
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

ContractingDock.propTypes = {
    currentStepType: PropTypes.oneOf(['CONTRACT_SIGNING', 'CONTRACT_VALIDATION']).isRequired,
    process: PropTypes.object.isRequired,

    onValidateContract: PropTypes.func.isRequired,
    onSignContract: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSendInfoRequest: PropTypes.func.isRequired,
};
