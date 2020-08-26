import PropTypes from 'prop-types';

export const _filterContext = {
    DOCTYPE_FILTER: 'DOCTYPE_FILTER',
    TIMEPERIOD_FILTER: 'TIMEPERIOD_FILTER',
    FILETYPE_FILTER: 'FILETYPE_FILTER',
};

export const _filterName = {
    TIMEPERIOD_FILTER_FROM: 'TIMEPERIOD_FILTER_FROM',
    TIMEPERIOD_FILTER_TO: 'TIMEPERIOD_FILTER_TO',

    FILETYPE_FILTER_WORD: 'FILETYPE_FILTER_WORD',
    FILETYPE_FILTER_PDF: 'FILETYPE_FILTER_PDF',
    FILETYPE_FILTER_TXT: 'FILETYPE_FILTER_TXT',
    FILETYPE_FILTER_ZIP: 'FILETYPE_FILTER_ZIP',
    FILETYPE_FILTER_IMAGE: 'FILETYPE_FILTER_IMAGE',
    FILETYPE_FILTER_OTHER: 'FILETYPE_FILTER_OTHER',

    DOCTYPE_FILTER_CONTRACT: 'DOCTYPE_FILTER_CONTRACT',
    DOCTYPE_FILTER_GENERAL: 'DOCTYPE_FILTER_GENERAL',
};

export const filterNameArrayPropType = PropTypes.oneOf(Object.keys(_filterName));

export const filterPropType = PropTypes.shape({
    name: filterNameArrayPropType,
    label: PropTypes.string,
    displayName: PropTypes.string,
    context: PropTypes.oneOf(Object.keys(_filterContext)),
    value: PropTypes.any,
});

export const filterArrayPropType = PropTypes.arrayOf(filterPropType);

export const timePeriodFilters = [
    {
        name: _filterName.TIMEPERIOD_FILTER_FROM,
        label: 'mrc.from',
        displayName: '',
        context: _filterContext.TIMEPERIOD_FILTER,
        value: null,
    },
    {
        name: _filterName.TIMEPERIOD_FILTER_TO,
        label: 'mrc.to',
        displayName: '',
        context: _filterContext.TIMEPERIOD_FILTER,
        value: null,
    },
];

export const fileTypeFilters = [
    {
        name: _filterName.FILETYPE_FILTER_WORD,
        label: null,
        displayName: 'WORD',
        context: _filterContext.FILETYPE_FILTER,
        value: null,
    },
    {
        name: _filterName.FILETYPE_FILTER_PDF,
        label: null,
        displayName: 'PDF',
        context: _filterContext.FILETYPE_FILTER,
        value: null,
    },
    {
        name: _filterName.FILETYPE_FILTER_TXT,
        label: null,
        displayName: 'TXT',
        context: _filterContext.FILETYPE_FILTER,
        value: null,
    },
    {
        name: _filterName.FILETYPE_FILTER_ZIP,
        label: null,
        displayName: 'ZIP',
        context: _filterContext.FILETYPE_FILTER,
        value: null,
    },
    {
        name: _filterName.FILETYPE_FILTER_IMAGE,
        label: null,
        displayName: 'IMAGE',
        context: _filterContext.FILETYPE_FILTER,
        value: null,
    },
    {
        name: _filterName.FILETYPE_FILTER_OTHER,
        label: null,
        displayName: 'OTHER',
        context: _filterContext.FILETYPE_FILTER,
        value: null,
    },
];

export const docTypeFilters = [
    {
        name: _filterName.DOCTYPE_FILTER_CONTRACT,
        label: '',
        displayName: 'mrc.attachments.types.contract',
        context: _filterContext.DOCTYPE_FILTER,
        value: null,
    },
    {
        name: _filterName.DOCTYPE_FILTER_GENERAL,
        label: '',
        displayName: 'mrc.attachments.types.general',
        context: _filterContext.DOCTYPE_FILTER,
        value: null,
    },
];
