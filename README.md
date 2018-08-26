DHIS2 Master Facility List App
===============================

## Description 
  This application will help you to manage and get all facilities information as well as integrated service information. The core functionalities are: 

    #As a government employee of ministry of health need to know the historical background of a facility 
    #To evaluate accessibility and equity of healthcare services:
      ## Ratio of primary health center per 100.000 population
      ## Number and distribution of health facilities per 10,000 population
      ## The proportion of health facilities providing certain services (for example family planning, ANC, TB, HIV / AIDS, Malaria, Immunization)
      ## Number and distribution of health facilities that provide certain services per 10,000 population
    # To Evaluate number of complete data, not complete data each facility (completeness)
    # Showing the mobile and emergency facilities (like respond for disasters)
    # To evaluate healthcare facility performance and availability of equipment
    # Standard number of doctors / medical specialists / sub-specialists / other medical personnel in hospitals and primary health centers
    # Availability of electricity 24 hours, waste management, clean water


## Prerequisites
Make sure you have at least the following versions of `node` and `npm`.

+ Node version v5.6.0 or higher
+ npm version 3.8.0 or higher
+ yarn version v1.1.1 or higher
Use the following commands to check your current versions
```sh
node -v

npm -v

yarn -v
```

## Getting started

Clone the repository from github with the following command
```sh
git clone 
```

Install the node dependencies
```sh
npm install

```

To set up your DHIS2 instance to work with the development service you will need to add the development servers address to the CORS whitelist. You can do this within the DHIS2 Settings app under the _access_ tab. On the access tab add `http://localhost:8081 or http://localhost:3000` to the CORS Whitelist.
> The starter app will look for a DHIS 2 development instance configuration in
> `$DHIS2_HOME/config`. So for example if your `DHIS2_HOME` environment variable is
> set to `~/.dhis2`, the starter app will look for `~/.dhis2/config.js` and then
> `~/.dhis2/config.json` and load the first one it can find.
>
> The config should export an object with the properties `baseUrl` and
> `authorization`, where authorization is the base64 encoding of your username and
> password. You can obtain this value by opening the console in your browser and
> typing `btoa('user:pass')`.
>
> If no config is found, the default `baseUrl` is `http://localhost:8080/dhis` and
> the default username and password is `admin` and `district`, respectively.
>
> See `webpack.config.js` for details.

This should enable you to run the following node commands:

To run the development server
```sh
npm start

or 

yarn start 
```

To run the tests one time
```sh
npm test
```

To run the tests continuously on file changes (for your BDD workflow)
```sh
npm run test-watch
```

To generate a coverage report for the tests
```sh
npm run coverage
```

To check the code style for both the JS and SCSS files run
```sh
npm run lint
```

## Getting started using yarn

In the d2-ui root directory:

```
yarn install
yarn bootstrap
yarn watch
``` 

```
yarn start
```
# Tools etc.

## Frameworks... and libraries
  D2, D2-UI, React JS, AJAX, Log4JS, CSS3 and HTML 5.

## Workflow

### npm
[Npm](https://www.npmjs.com) is used as both a dependency management tool as a _workflow manager_ through its `scripts` as can be seen in the [package.json]. It provides convenience commands to kick off various tasks. These tasks are mentioned above as `npm run <command>`, `npm start`, `npm test`, etc.

## Testing


