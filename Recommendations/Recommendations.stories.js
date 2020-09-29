import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import '../Util/imports';

import Recommendations from '../Recommendations';

storiesOf('Recommendations', module)
    .add('standard', () => (
        <Recommendations
            recommendations={[
                {
                    id: '1',
                    content: 'foo',
                    rating: '5',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                },
                {
                    id: '2',
                    content: 'bar',
                    rating: '4',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                    canEdit: true,
                },
            ]}
            addNewDisabled={false}
            canAddNew={true}
            onDelete={(id) => console.log('deleting recommendation with id: ' + id)}
            onSave={(id, content, rating) =>
                console.log('saving recommendation with id, content, rating ', id, content, rating)
            }
        />
    ))
    .add('2-recommendations', () => (
        <Recommendations
            recommendations={[
                {
                    content: 'foo',
                    rating: '5',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                    editableByCurrentUser: true,
                },
                {
                    content: 'bar',
                    rating: '5',
                    uploaderName: 'John Doe',
                    uploaderPosition: 'HOT',
                    uploadTime: '2019-02-02',
                },
            ]}
            canAddNew={true}
        />
    ));
