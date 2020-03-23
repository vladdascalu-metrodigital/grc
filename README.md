# Metro Risk Check - Global React Components

This repo is used to share react components and styles between multiple MRC services.

# Using Storybook for local development

-   npm install
-   npm run storybook

On http://localhost:6006 you should now be able to see a UI having links to some components. Also changes on your local files should be watched and updated into your browser.

# How to debug react-related components locally (NO npm publishing is required to do it):

1.  make your changes in the component (global-react-components or component-library)
1.  change version locally only
1.  npm install
1.  npm pack (it will show you archived component name)
1.  in service (e.g. credit-limit) in package.json file change

`"global-react-components": "1.0.46"`

with

`"global-react-components": "file:/path/to/your/global/react/components/global-react-components-1.0.47.tgz"`

now it is possible to build credit-limit (other services) with new version of global-react-components
