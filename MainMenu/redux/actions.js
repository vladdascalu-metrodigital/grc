export const actionTypes = {
    NAVIGATION_ITEM_ACTIVATED: 'NAVIGATION_ITEM_ACTIVATED',
};

export const navigationItemActivated = (item) => ({
    type: actionTypes.NAVIGATION_ITEM_ACTIVATED,
    item,
});

export const actions = {
    navigationItemActivated,
};
