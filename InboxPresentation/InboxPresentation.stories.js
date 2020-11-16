import React from 'react';
import { storiesOf } from '@storybook/react';

import InboxPresentation from '../InboxPresentation';

import inboxItems from '../fixtures/inbox/filteredinboxItems';
const defaultSortingOption = 'creationDate,DESC';
const availableSortingOptions = [
    defaultSortingOption,
    'creationDate,ASC',
    'requestDate,DESC&creationDate,DESC',
    'requestDate,ASC&creationDate,ASC',
];

storiesOf('Services/InboxPresentation', module).add('InboxPresentation', () => (
    <InboxPresentation
        data={inboxItems}
        filterAvailable={true}
        isTablet={true}
        getAvailableSortingOptions={() => availableSortingOptions}
        getChosenSortOption={() => defaultSortingOption}
        setAvailableSortingOptions={(option) => console.log(option)}
        confirmNotification={(uri) => console.log('confirmed uri: ' + uri)}
        onFilterChanged={(filter) => console.log('onchanged filter: ' + filter)}
        currentFilterValue={() => console.log('currentFilterValue')}
        fetchInboxItems={(filter) => console.log('fetchInboxItems with filter: ' + JSON.stringify(filter))}
        getChosenFilter={() => console.log('getChosenFilter')}
        setChosenFilter={(filter) => console.log('setChosenFilter with argument: ' + JSON.stringify(filter))}
    />
));
