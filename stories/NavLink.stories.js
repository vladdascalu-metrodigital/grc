import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import '../Util/imports';

import { NavLink } from 'react-router-dom';

storiesOf('Etc/React Router NavLink', module).add('MRC-3820', () => {
    const activeLinkFilter = (match, pathToCheck, location) => {
        // 1. for some reason match was always false and location had no values for its entries
        // soo we have to take the real window location url for testing..
        const windowUrl = window.location.href;

        // and since in storybook our component visualization is inside of iframes,
        // and storybook itself seeming to probably have some react-router itself,
        // resulting in our windowUrl to be rather nasty, we have to do some more cheating here
        const urlParts = windowUrl.split('?id=');
        const urlLastPart = urlParts[1];

        const currentComponentsNameInsideOfUrlParts = urlLastPart.split('&');
        const currentComponentsNameInsideOfUrl = currentComponentsNameInsideOfUrlParts[0];

        const pathToCheckIsActive = pathToCheck.includes(currentComponentsNameInsideOfUrl);
        return pathToCheckIsActive;
    };
    //2. ..and put link URLs into variables
    const path1 = '/?path=/story/button--primary';
    const path2 = '/?path=/story/navlink--mrc-3820';

    //we have to include keys to the following components, because we will
    //render them from within a list (array)

    const someLink = (
        <NavLink
            key="1"
            to={{ pathname: path1 }}
            isActive={(match, location) => activeLinkFilter(match, path1)}
            exact
            activeClassName="metro-active-url-class_still-to-be-defined"
        >
            nonActive link
        </NavLink>
    );

    const activeLink = (
        <NavLink
            key="3"
            to={{ pathname: path2 }}
            isActive={(match, location) => activeLinkFilter(match, path2)}
            exact
            activeClassName="metro-active-url-class_still-to-be-defined"
        >
            active link
        </NavLink>
    );

    const lineBreak = <br key="2" />;

    return <div>{[someLink, lineBreak, activeLink]}</div>;
});
