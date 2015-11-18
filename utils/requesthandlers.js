// ## Dependencies
var Stock = require('../db/stocks.js');
var helpers = require('./helpers');
var Promise = require('bluebird');
var formulae = require('./formulae');

// ## Methods

/*************************************************
  Get ticker information from database 
  or pull & process it from the Yahoo Finance API.
  Resolves to a single correlation value.
**************************************************/
exports.handleTicker = function(user) {
  var ticker = user.ticker;
  var stock = Stock.model.where({ticker: ticker});

  var promise = new Promise(function(resolve, reject) {

    stock.findOne(function(err, stock) {
      if (err) { reject(err); }
      // A. Check if ticker is in database.
      if (stock) {
        // B. If it is, return the correlation from the db.
        resolve(stock.correlation);

  /*------BEGIN PROMISE CHAIN TO RETRIEVE AND PROCESS STOCK DATA----*/
      } else {
        // 1) If not, get the csv from Yahoo Finance API.
        helpers.getStockCSV(ticker).then(function(res) {
          // Ticker doesn't exist in Yahoo's database.
          if (res.statusCode == 404) {
            throw new Error('ticker not found');
            return null;
          } else {
            return res.body;
          }
        })
        .then(function(data) {
          // 2) Parse the csv.
          return helpers.parseStock(data).then(function(data) {
            return data;
          });
        })
        .then(function(data) {
          // 3) Compute the correlation.
          return helpers.getCorrelation(data);
        }).then(function(correlation) {
          var newStock = new Stock.model({
            ticker: ticker,
            correlation: correlation
          });

          // 4) Save stock to database.
          newStock.save(function(err, newStock) {
            if (err) {
              reject(err);
            } else {
              resolve(correlation);
            }
          });
        })
        .catch(function(err) {
          reject(err);
        });
      }
    });
  });

  return promise;
};

/**************************************************************************
  Handle a request to /portfolio and return user portfolio from formulae.js
***************************************************************************/
exports.handleRequest = function(user) {
  var promise = new Promise(function(resolve, reject) {
    exports.handleTicker(user).then(function(correlation) {
      var riskAversion = helpers.getRiskAversion(user.surveyResults);
      var fractionOfWealth = user.fractionOfWealth;
      return formulae.getData(riskAversion, correlation, fractionOfWealth);
    })
    .then(function(portfolio) {
      // Send portfolio back to the ```'/post'``` route of [server.js](./server.html).
      resolve(portfolio);
    })
    .catch(function(err) {
      reject(err);
    });
  });

  return promise;
};
