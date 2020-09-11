import React from 'react';
import { storiesOf } from '@storybook/react';
import ActionDock, { SimpleActionDock } from '../ActionDock';
import ApprovalDock from '../new-ui-topics/ApprovalDock/ApprovalDock';
import ContractingDock from '../new-ui-topics/ApprovalDock/ContractingDock';
import RejectionDock from '../new-ui-topics/ApprovalDock/RejectionDock';
import { action } from '@storybook/addon-actions';

storiesOf('Fundamentals/ActionDock', module)
    .add('Simple ActionDock', () => (
        <SimpleActionDock onCancel={() => action('actionDockCancel')()} onApply={() => action('actionDockApply')()} />
    ))
    .add('Simple ActionDock, custom labels', () => (
        <SimpleActionDock
            onCancel={() => action('actionDockCancel')()}
            cancelText="NO"
            onApply={() => action('actionDockApply')()}
            applyText="YES"
        />
    ));

storiesOf('New UI Topics/ApprovalServicee Docks', module).add('ApprovalDock', () => (
    <ApprovalDock
        onReject={() => action('onReject')()}
        onBlock={() => action('onBlock')()}
        onCancel={() => action('onCancel')()}
        onApprove={() => action('onApprove')()}
        onSendInfoRequest={(data) => action('onSendInfoRequest')(data)}
    />
));

storiesOf('New UI Topics/ApprovalServicee Docks', module)
    .add('ContractingDock: Signing', () => (
        <ContractingDock
            currentStepType="CONTRACT_SIGNING"
            onValidateContract={() => action('onValidateContract')()}
            onSignContract={() => action('onSignContract')()}
            onRequestContractingInfo={() => action('onRequestContractingInfo')()}
            onCancel={() => action('onCancel')()}
        />
    ))
    .add('ContractingDock: Validation', () => (
        <ContractingDock
            currentStepType="CONTRACT_VALIDATION"
            onValidateContract={() => action('onValidateContract')()}
            onSignContract={() => action('onSignContract')()}
            onRequestContractingInfo={() => action('onRequestContractingInfo')()}
            onCancel={() => action('onCancel')()}
        />
    ));

storiesOf('New UI Topics/ApprovalServicee Docks', module).add('RejectionDock: Signing', () => (
    <RejectionDock
        currentStepType="CONTRACT_SIGNING"
        onValidateContract={() => action('onValidateContract')()}
        onSignContract={() => action('onSignContract')()}
        onRequestContractingInfo={() => action('onRequestContractingInfo')()}
        onCancel={() => action('onCancel')()}
    />
));
