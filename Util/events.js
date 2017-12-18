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

export const auxControlEvent = value => {
    const type = 'AUX_CONTROL_EVENT';
    return Object.assign({value}, {type});
};


export const currentUiPageTitleEvent = text => ({
    type: 'CURRENT_UI_PAGE_TITLE',
    text
});

