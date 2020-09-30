import React from 'react';
import { storiesOf } from '@storybook/react';

import recentRequestsData from '../fixtures/credit-limit/customers.recentRequests';

import RecentRequestsInfo from '../RecentRequestsInfo';

storiesOf('Service Components/RecentRequestsInfo', module)
    .add('standard desktop', () => <RecentRequestsInfo isTablet={true} recentRequests={recentRequestsData} />)
    .add('standard mobile', () => <RecentRequestsInfo isTablet={false} recentRequests={recentRequestsData} />);
