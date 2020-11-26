# Global React Components

This repo contains a library that is used by all microservices that have an UI.
The library primarily consists of React components but also styles, images,
icons and JSON specs used by the frontend.

The name "global-react-components" comes from a time when this repo was thought
to only contain shared components that would be used by at least 2 different
microservices. Since then, almost all React components (even the
service-specific ones) have been move to this library for a better, single
overview and possibility to test entire UI's directly in storybook.

Service-specific components are located in directories with the same name as
the microservice: `CreditLimit`, `CreditCorrection`, `ApprovalService`,
`History`, `Inbox`, `ReportingService`, `BatchUpdateService`.

# Using Storybook for local development

-   npm install
-   npm run storybook

On http://localhost:6006 you should now be able to see a UI having links to some components. Also changes on your local files should be watched and updated into your browser.

# Publishing a new version of the library

-   Update the library version in package.json
-   npm publish

# How generate a local version of the library (No `npm publish` needed)

1.  make your changes in this repository global-react-components
1.  change version locally only
1.  npm install
1.  npm pack (it will show you archived component name)
1.  in service (e.g. credit-limit) in package.json file change

`"global-react-components": "1.0.46"`

with

`"global-react-components": "file:/path/to/your/global/react/components/global-react-components-1.0.47.tgz"`

now it is possible to build credit-limit (other services) with new version of global-react-components
