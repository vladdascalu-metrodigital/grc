import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import '../Util/imports';

import Report from '../ReportingService/Report';
import Summary from '../ReportingService/Summary';

storiesOf('Services/ReportingService', module)
    .add('Report', () => <Report name="Report Title" datastudioId={'no-id'} />)
    .add('Summary', () => (
        <Summary
            reports={[
                {
                    id: 'abc123',
                    name: 'Data Report',
                },
                {
                    id: '123abc',
                    name: 'All Numbers',
                },
            ]}
        />
    ));
