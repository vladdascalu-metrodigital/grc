import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import CustomerGroupLimits from '../CustomerGroupLimits';

storiesOf('CustomerGroupLimits', module).add('CustomerGroupLimits', () => {
    return (
        <CustomerGroupLimits
            country={'DE'}
            availableGroupLimit={12000}
            exhaustionGroupLimit={15000}
            currentGroupLimit={9000}
            requestedGroupLimit={11000}
            approvedGroupLimitInst={10500}
            hideApprovedGroupLimit={false}
        />
    );
});
