var formulas = require('./formulas');

exports.getData = function(user) {

/*-------------------------------- DEFINE GLOBAL VARIABLES ---------------------------------------*/
// For rounding purposes
var basisPoints = 4;

// // Mapped data for D3 rendering
// var financialPortfolioData;
// var totalWealthPortfolioData;
// var utilityCurveData;


/*-------------------------------- DEFINE MODEL INPUTS -------------------------------------------*/
// Here the inputs for our tool are defined
var modelInputs = {
  rF: formulas.inputs.rF,
  market: {
    avgReturn: formulas.inputs.mktAvg,
    stdDev: formulas.inputs.mktSD
  },
  incomePV: {
    avgReturn: formulas.inputs.incomeAvg,
    stdDev: formulas.inputs.incomeSD
  },
  correlation: user.correlation,
  wealthSplit: user.fractionOfWealth,
  riskAversion: user.riskAversion
};


/*------------------------------- DEFINE OPTIMAL WEIGHT STORAGE OBJECT ---------------------------*/
var optimalWeights = {
  // OI = outside income
  OI: {
    riskyAsset: user.riskyAsset,
    bond: user.bond,
    financialMean: user.financialMean,
    financialStdDev: user.financialSD,
    totalWealthMean: user.totalWealthMean,
    totalWealthStdDev: user.totalWealthSD,
    maxUtility: user.maxUtility
  }
};


/*-------------------------------- DEFINE PORTFOLIOS ----------------------------------------------*/

var totalWealthPortfolio = {
  mean: [],
  stdDev: []
};

var utilityCurve = {
  mean: [],
  stdDev: []
};


/*------------------------------ CALCULATE PORTFOLIOS -------------------------------------------*/
// Call calculatePortfolios to update portfolios' mean stdDev's at 10% intervals
var calculatePortfolios = function() {
  // Initialize the risky asset's weight to 0% and therefore the bond to 100%
  var riskyAssetWeight = 0;

  for (var i = 0; i <= 10; i++) {

    /*----------- Calculate mean for the totalWealthPorfolio --------------------*/
    var totalWealthMean = (modelInputs.wealthSplit * financialPortfolio.mean[i]) +
    (1 - modelInputs.wealthSplit) * modelInputs.incomePV.avgReturn;

    totalWealthPortfolio.mean.push(+totalWealthMean.toFixed(basisPoints));
    /*---------------------------------------------------------------------------*/


    /*----------- Calculate standard deviation for the totalWealthPortfolio ------*/
    var totalWealthStdDev = Math.sqrt(
      (Math.pow(modelInputs.wealthSplit, 2) * Math.pow(financialPortfolio.stdDev[i], 2)) +
      (Math.pow(1 - modelInputs.wealthSplit, 2) * Math.pow(modelInputs.incomePV.stdDev, 2)) +
      (
        2 * modelInputs.wealthSplit * (1 - modelInputs.wealthSplit) * riskyAssetWeight *
        modelInputs.correlation * modelInputs.market.stdDev * modelInputs.incomePV.stdDev
      )
      );

    totalWealthPortfolio.stdDev.push(+totalWealthStdDev.toFixed(basisPoints));
    /*---------------------------------------------------------------------------*/


    // Increment the risky asset weight by factor of 10%
    riskyAssetWeight += 0.1;
  }
};


/*------------------------------ CALCULATE UTILITY CURVE ----------------------------------------*/
var calculateUtiltyCurve = function() {

  //Initialize factors to calculate range of utility points on the utility curve
  var initStdDev = totalWealthPortfolio.stdDev[10] + 0.01;
  var initFactor = 59;

  for (var i = 0; i < 60; i++) {

    /*----------- Calculate standard deviation for the utilityCurve -------*/
    var stdDev = initStdDev * i / initFactor;

    utilityCurve.stdDev.push(+stdDev.toFixed(basisPoints));
    /*---------------------------------------------------------------------*/


    /*----------- Calculate mean for the utilityCurve ---------------------*/
    var mean = optimalWeights.OI.maxUtility +
    (0.5 * Math.pow(utilityCurve.stdDev[i], 2) * modelInputs.riskAversion);

    utilityCurve.mean.push(+mean.toFixed(basisPoints));
    /*---------------------------------------------------------------------*/

  }
};

calculatePortfolios();
calculateUtiltyCurve();

return {
  totalWealthPortfolio: totalWealthPortfolio,
  utilityCurve: utilityCurve
};

};


// /*------------------------------ MAP DATA FOR D3 ------------------------------------------------*/
// var mapDataForD3 = function() {

//   //Map portfolio data to the format: [ {mean: value, stdDev: value}, { .., .. }, .. ]
//   var mapData = function(obj) {
//     var mappedObj = obj.mean.map(function(element) {
//       return {
//         "mean": element
//       };
//     });
//     mappedObj.forEach(function(element, i) {
//       element["stdDev"] = obj.stdDev[i];
//     });
//     return mappedObj;
//   };

//   financialPortfolioData = mapData(financialPortfolio);
//   totalWealthPortfolioData = mapData(totalWealthPortfolio);
//   utilityCurveData = mapData(utilityCurve);
// };
