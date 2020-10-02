import React from 'react';
import { storiesOf } from '@storybook/react';
import ToggleBox from '../ToggleBox';

storiesOf('Fundamentals/ToggleBox', module).add('toggly toggle', () => (
    <ToggleBox titleContent={'hello'}>
        <p>
            Qui labore magna amet quis id proident enim commodo veniam qui consequat magna sit. Deserunt excepteur id
            ipsum mollit aliqua sit esse aute magna cillum consequat aliquip. Culpa adipisicing reprehenderit minim sit
            dolore nisi aliqua eu ut ipsum excepteur tempor commodo. Sunt est eu id labore nisi enim Lorem. Veniam ad in
            velit occaecat culpa commodo sunt sint. Reprehenderit minim elit pariatur sunt.
        </p>
    </ToggleBox>
));
