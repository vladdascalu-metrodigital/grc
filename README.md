# Metro Risk Check - Global React Components

This repo is used to share react components and styles between multiple MRC services.

# Publishing Repository

Create a file with the name
```
.npmrc
```
and the contents:
```
repository = https://nexus-dst.metrosystems.net/repository/npm-mrc-component-libraries/
email = yourJIRAetcAccountEmail
_auth = openssl_base64_encrypted
```
openssl_base64_encrypted can be generated via
```
echo -n yourJIRAetcAccountEmail:yourPasswordForThisAccount | openssl base64
```

Once your configuration file is setup you can publish your local changes via
```
npm publish
```
