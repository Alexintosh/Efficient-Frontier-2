# Efficient Frontier
[See it live here!](http://efficientfrontier.herokuapp.com)

## Table of Contents

1. [Documentation](#Documentation)
2. [About](#About)
3. [Examples](#Examples)
4. [Requirements](#Requirements)
5. [Development](#Development)
    1. [Installation](#Installation)
    2. [Running the app](#Running-the-app-locally)
6. [Production](#Production)

## Documentation

View the documentation [here](http://efficientfrontier.herokuapp.com/documentation)

## About

> Efficient Frontier is a financial portfolio recommendation engine based on the principles of Modern Portfolio Theory. It generates an optimal personal financial portfolio based on risk aversion, percentage of wealth desired in financial assets, and correlation of income with the market.

## Requirements

- node 0.12.0
- body-parser 1.14.1
- csv-parse 1.0.0
- express 4.13.3
- highcharts 0.0.10
- install 0.2.6
- material-ui 0.13.0
- mongoose 4.2.4
- npm 3.3.12
- react 0.14.0
- react-dom 0.14.0
- react-highcharts 5.0.0
- react-tap-event-plugin 0.2.1
- readable-stream 2.0.4
- simple-statistics 1.0.0
- underscore 1.8.3


## Development

### Installation
After cloning the repository, install dependencies:
```
npm install
```

### Running the app locally
Open up a local mongodb instance by running this command
```
mongod
```

Now run development build process by executing
```
npm start
```

Run the node server locally by running this command from the project directory
```
node server.js
```

Access the app on localhost:8080

## Production

Build for production by running
```
gulp prod
```

Generate doccumentation by running
```
grunt docco
```
