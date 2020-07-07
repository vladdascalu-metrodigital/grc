import React from 'react';
import { storiesOf } from '@storybook/react';

import InboxPresentation from '../InboxPresentation';

import inboxItems from './fixtures/inbox/filteredinboxItems';

storiesOf('InboxPresentation', module).add('standard', () => (
    <InboxPresentation
        data={inboxItems}
        filterAvailable={true}
        isTablet={true}
        confirmNotification={(uri) => console.log('confirmed uri: ' + uri)}
        onFilterChanged={(filter) => console.log('onchanged filter: ' + filter)}
        currentFilterValue={() => console.log('currentFilterValue')}
        fetchInboxItems={(filter) => console.log('fetchInboxItems with filter: ' + JSON.stringify(filter))}
        getChosenFilter={() => console.log('getChosenFilter')}
        setChosenFilter={(filter) => console.log('setChosenFilter with argument: ' + JSON.stringify(filter))}
    />
));
