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
        resolve(response, body);
      }
    });
  });

  return promise;
};

exports.getCorrelation = function(stockData) {
  var correlation = Stats.sampleCorrelation(stockData, marketData);
  return correlation;
};


