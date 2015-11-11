var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var db = require('../db/config.js');
var Stock = require('../db/stocks.js');
var helpers = require('./helpers');
var Promise = require('bluebird');
var formulas = require('./formulas');
var graphdata = require('./graphdata');
var formulae = require('./formulae');

exports.handleTicker = function(user) {
  var ticker = user.ticker;
  var stock = Stock.model.where({ticker: ticker});

  var promise = new Promise(function(resolve, reject) {

    stock.findOne(function(err, stock) {
      if (err) { reject(err); }
      //A. Check if ticker is in database
      if (stock) {
        //B. If it is, return the correlation from the db
        resolve(stock.correlation);
      } else {
        //1. if not, get the csv
        helpers.getStockCSV(ticker).then(function(res, data) {
          if (res.statusCode == 404) {
            throw new Error('ticker not found');
            return null;
          }
          return data;
        })
        .then(function(data) {
          // 2. parse the csv
          return helpers.parseStock(data).then(function(data) {
            return data;
          });
        })
        .then(function(data) {
          // 4. compute the correlation
          return helpers.getCorrelation(data);
        }).then(function(correlation) {
          // 5. save stock to db
          var newStock = new Stock.model({
            ticker: ticker,
            correlation: correlation
          });

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

exports.computePortfolio = function(riskAversion, correlation, fractionOfWealth) {
  var portfolio = {};

  portfolio['riskAversion'] = riskAversion;
  portfolio['correlation'] = +correlation.toFixed(4);
  portfolio['fractionOfWealth'] = fractionOfWealth;
  portfolio['riskyAsset'] = formulas.riskyAsset(riskAversion, correlation, fractionOfWealth);
  portfolio['bond'] = formulas.bond(riskAversion, correlation, fractionOfWealth);
  portfolio['financialMean'] = formulas.financialMean(riskAversion, correlation, fractionOfWealth);
  portfolio['financialSD'] = formulas.financialSD(riskAversion, correlation, fractionOfWealth);
  portfolio['totalWealthMean'] = formulas.totalWealthMean(riskAversion, correlation, fractionOfWealth);
  portfolio['totalWealthSD'] = formulas.totalWealthSD(riskAversion, correlation, fractionOfWealth);
  portfolio['maxUtility'] = formulas.maxUtility(riskAversion, correlation, fractionOfWealth);

  portfolio['graphData'] = graphdata.getData(portfolio);

  return portfolio;
};

exports.handleRequest = function(user) {
  var promise = new Promise(function(resolve, reject) {
    exports.handleTicker(user).then(function(correlation) {
      var riskAversion = formulas.computeRiskAversion(user.surveyResults);
      var fractionOfWealth = user.fractionOfWealth;
      return formulae.getData(riskAversion, correlation, fractionOfWealth);
    })
    .then(function(portfolio) {
      //send portfolio back to client
      resolve(portfolio);
    })
    .catch(function(err) {
      reject(err);
    });

  });

  return promise;
};
