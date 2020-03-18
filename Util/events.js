export const navFlyoutVisibilityChangeEvent = visibilityState => ({
    type: 'NAV_FLYOUT_VISIBILITY_CHANGE',
    visibilityState,
});

export const resizeEvent = (tablet, desktop) => ({
    type: 'RESIZE',
    tablet,
    desktop,
});

export const showInfo = message => showNotification(message, 'info');

export const showWarning = message => showNotification(message, 'warning');

export const showSuccess = message => showNotification(message, 'success');

export const showError = message => showNotification(message, 'error');

export const showNotification = (message, messageType) => ({
    type: 'NOTIFICATION',
    message,
    messageType,
});

export const hideNotification = () => ({
    type: 'NOTIFICATION',
    message: null,
    messageType: null,
});

export const auxControlEvent = value => {
    const type = 'AUX_CONTROL_EVENT';
    return Object.assign({ value }, { type });
};

export const currentUiPageTitleEvent = text => ({
    type: 'CURRENT_UI_PAGE_TITLE',
    text,
});
