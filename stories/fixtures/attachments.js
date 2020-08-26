import { action } from '@storybook/addon-actions';

export const attachment = {
    status: 'PropTypes.string',
    title: 'PropTypes.string',
    fileType: 'PropTypes.string',
    documentType: 'PropTypes.string',
    amount: 'PropTypes.string',
    expiry: 'PropTypes.string',
    author: 'PropTypes.string',
    timestamp: 'PropTypes.string',
    secondaryInteraction: 'PropTypes.string',
    handlePrimaryAction: action('handlePrimaryAction')('handlePrimaryAction'),
    handleSecondaryAction: action('handleSecondaryAction')('handleSecondaryAction'),
    disabled: false,
    metadata: [],
};

export const attachments = [attachment, attachment, attachment, attachment, attachment, attachment, attachment];
