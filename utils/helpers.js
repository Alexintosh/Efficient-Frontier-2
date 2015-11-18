// ## Dependencies
var bluebird = require('bluebird');
var parse = require('csv-parse');
var request = require('request');
var marketData = require('./sp500data');
var Stats = require('simple-statistics');

// ## Methods

/**************************************************
  Parses the csv returned by Yahoo Finance API to 
  get an array of adjusted closing prices.
***************************************************/
exports.parseStock = function(csv) {
  var promise = new Promise(function(resolve, reject) {
    parse(csv, {columns: true}, function(err, data) {
      if (err) { reject(err); }
      else {
        // Remove irrelevant data from CSV and coerce values to ```typeof``` *Number*
        var output = data.map(function(entry) {
          return +entry['Adj Close'];
        });

        resolve(output);
      }
    });
  });

  return promise;
};

/**************************************************
  Returns the Query String for a user provided stock ticker.
***************************************************/
exports.stockQueryString = function(ticker) {
  return 'http://ichart.finance.yahoo.com/table.csv?s=' + ticker + '&a=07&b=30&c=2013&d=08&e=4&f=2015&g=w&ignore=.csv';
};

// Makes a request to Yahoo Finance API for a specific stock
exports.getStockCSV = function(ticker) {
  var promise = new Promise(function(resolve, reject) {
    request.get(exports.stockQueryString(ticker), function(err, response, body) {
      if (err) { reject(err); }
      else {
        resolve(response);
      }
    });
  });

  return promise;
};

/**************************************************
  Returns the correlation between a specific stock and the S&P500. 
  Expects an array of closing prices.
***************************************************/
exports.getCorrelation = function(stockData) {
  var correlation = Stats.sampleCorrelation(stockData, marketData);
  return correlation;
};

/**************************************************
  Returns the average Risk Aversion of a user from their survey.
***************************************************/
exports.getRiskAversion = function(surveyResults) {
  return +Math.round((
          (surveyResults[0] + surveyResults[1] +
           surveyResults[2] + surveyResults[3] + surveyResults[4]) / 5 )
          );
};
