var path = require('path');
var fs = require('fs');
var bluebird = require('bluebird');
var parse = require('csv-parse');
var request = require('request');
var mongoose = require('mongoose');
var db = require('../db/config.js');
var Stock = require('../db/stocks');
var marketData = require('./sp500data');
var Stats = require('simple-statistics');

exports.parseStock = function(csv) {

  var promise = new Promise(function(resolve, reject) {
    parse(csv, {columns: true}, function(err, data) {
      if (err) {
        reject(err);
      } else {
        var output = data.map(function(entry) {
          return +entry['Adj Close'];
        });

        resolve(output);
      }
    });
  });

  return promise;
};

exports.stockQueryString = function(ticker) {
  return 'http://ichart.finance.yahoo.com/table.csv?s=' + ticker + '&a=07&b=30&c=2013&d=08&e=4&f=2015&g=w&ignore=.csv';
};

exports.getStockCSV = function(ticker) {
  var promise = new Promise(function(resolve, reject) {
    request.get(exports.stockQueryString(ticker), function(err, response, body) {
      if (err) { reject(err); }
      else {
        resolve(body);
      }
    });
  });

  return promise;
};

exports.getCorrelation = function(stockData) {
  var correlation = Stats.sampleCorrelation(stockData, marketData);
  return correlation;
};

// console.log(exports.getCorrelation());

/*
exports.getStockCSV('AMZN').then(function(csv) {
  return csv;
})
.then(function(csv) {
  return exports.parseStock(csv).then(function(data) {
    return data;
  });
})
.then(function(data) {
  console.log(data);
})
.catch(function(err) {
  console.log(err);
});
*/

/*
  Risk profile

  1. Do survey
  3. add each answer to obj to send to server
*/

/*
  %invesment

  1. Do survey
  3. add to obj to send to server
*/

/*Send this to server after completing steps*/
var sendToServer = {
  q1: 1.25,
  q2: 1.25,
  q3: 1.50,
  q4: 1.75,
  q5: 2.00,
  investmentSplit: 0.5,
  ticker: 'string'
};


/*CORRELATION STEPS
A. Check if ticker is in database
  1. if not, get the csv
  2. parse the csv
  3. compute the correlation
  4. save the correlation to the database
  5. return the correlation
B. If it is, return the correlation from the db
*/
