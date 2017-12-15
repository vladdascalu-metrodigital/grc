export const navFlyoutVisibilityChangeEvent = (visibilityState) => ({
    type: 'NAV_FLYOUT_VISIBILITY_CHANGE',
    visibilityState
});

export const resizeEvent = (tablet, desktop) => ({
    type: 'RESIZE',
    tablet,
    desktop
});

export const showError = (error, showReloadBtn = false) => ({
    type: 'ERROR',
    error,
    showReloadBtn
});

export const showWarning = (message) => ({
    type: 'WARNING',
    message
});

export const hideError = () => ({
    type: 'ERROR',
    error: null
});
