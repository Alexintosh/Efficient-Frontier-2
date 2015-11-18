// #### This file contains all calculations necessary to return a final user object which represents that user's optimal portfolio.

exports.getData = function(riskAversion, correlation, fractionOfWealth) {

/*-------------------------------- DEFINE VARIABLES ---------------------------------------*/
  // For rounding purposes.
  var basisPoints = 4;

  // Mapped data for Highcharts rendering.
  var financialPortfolioData;
  var totalWealthPortfolioData;
  var utilityCurveData;


/*-------------------------------- DEFINE MODEL INPUTS -------------------------------------------*/
  // Here the inputs for our tool are defined.
  var modelInputs = {
    rF: 0.01,
    market: {
      avgReturn: 0.06,
      stdDev: 0.16
    },
    incomePV: {
      avgReturn: 0.15,
      stdDev: 0.25
    },
    correlation: correlation,
    wealthSplit: fractionOfWealth,
    riskAversion: riskAversion
  };


/*------------------------------- DEFINE OPTIMAL WEIGHT STORAGE OBJECT ---------------------------*/
  var optimalWeights = {
    // OI = outside income.
    OI: {
      riskyAsset: 0,
      bond: 0,
      financialMean: 0,
      financialStdDev: 0,
      totalWealthMean: 0,
      totalWealthStdDev: 0,
      maxUtility: 0
    },
    noOI: {
      riskyAsset: 0,
      bond: 0,
      financialMean: 0,
      financialStdDev: 0,
      maxUtility: 0
    }
  };


  /*-------------------------------- DEFINE PORTFOLIOS ----------------------------------------------*/
  var financialPortfolio = {
    mean: [],
    stdDev: []
  };

  var totalWealthPortfolio = {
    mean: [],
    stdDev: []
  };

  var utilityCurve = {
    mean: [],
    stdDev: []
  };


/*---------------------------- DEFINE OPTIMAL WEIGHT FORMULAE -----------------------------------*/

  // Updates optimalWeights to reflect current modelInputs.
  var calculateWeights = function() {

    // Short hand for object access.
    var OI = optimalWeights.OI;
    var noOI = optimalWeights.noOI;

  /*--- The following formulae calculate the weights stored in the optimalWeights object ---*/

    // Optimal weight of the risky asset considering outside income factors.
    OI.riskyAsset = +(
      (modelInputs.market.avgReturn - modelInputs.rF - (modelInputs.riskAversion *
      modelInputs.correlation * modelInputs.incomePV.stdDev * modelInputs.market.stdDev) +
      (modelInputs.riskAversion * modelInputs.wealthSplit * modelInputs.correlation *
      modelInputs.incomePV.stdDev * modelInputs.market.stdDev)) /
      (modelInputs.riskAversion * modelInputs.wealthSplit * Math.pow(modelInputs.market.stdDev, 2))
    ).toFixed(basisPoints);


    // Optimal weight of the bond considering outside income factors.
    OI.bond = +(1 - OI.riskyAsset).toFixed(basisPoints);


    // Optimal financial mean considering outside income factors.
    OI.financialMean = +(
      (OI.riskyAsset * modelInputs.market.avgReturn) +
      (1 - OI.riskyAsset) * modelInputs.rF
    ).toFixed(basisPoints);


    // Optimal financial standard deviation considering outside income factors.
    OI.financialStdDev = +(modelInputs.market.stdDev * OI.riskyAsset).toFixed(basisPoints);


    // Optimal total wealth mean considering outside income factors.
    OI.totalWealthMean = +(
      (modelInputs.wealthSplit * OI.financialMean) +
      ((1 - modelInputs.wealthSplit) * modelInputs.incomePV.avgReturn)
    ).toFixed(basisPoints);


    // Optimal total wealth standard deviation considering outside income factors.
    OI.totalWealthStdDev = +(Math.sqrt(
      (Math.pow(modelInputs.wealthSplit, 2) * Math.pow(OI.financialStdDev, 2)) +
      (Math.pow(1 - modelInputs.wealthSplit, 2) * Math.pow(modelInputs.incomePV.stdDev, 2)) +
      (
        2 * modelInputs.wealthSplit * (1 - modelInputs.wealthSplit) * OI.riskyAsset *
        modelInputs.correlation * modelInputs.market.stdDev * modelInputs.incomePV.stdDev
      )
    )).toFixed(basisPoints);


    // Maximum utility considering outside income factors.
    OI.maxUtility = +(
      OI.totalWealthMean - (0.5 * modelInputs.riskAversion * Math.pow(OI.totalWealthStdDev, 2))
    ).toFixed(basisPoints);


    // Optimal weight of the risky asset ignoring outside income factors.
    noOI.riskyAsset = +(
      (modelInputs.market.avgReturn - modelInputs.rF) /
      (modelInputs.riskAversion * Math.pow(modelInputs.market.stdDev, 2))
    ).toFixed(basisPoints);


    // Optimal weight of the bond ignoring outside income factors.
    noOI.bond = +(1 - noOI.riskyAsset).toFixed(basisPoints);


    // Optimal financial mean ignoring outside income factors.
    noOI.financialMean = +(
      (noOI.riskyAsset * modelInputs.market.avgReturn) +
      (1 - noOI.riskyAsset) * modelInputs.rF
    ).toFixed(basisPoints);


    // Optimal financial standard deviation ignoring outside income factors.
    noOI.financialStdDev = +(noOI.riskyAsset * modelInputs.market.stdDev).toFixed(basisPoints);


    // Maximum utility ignoring outside income factors.
    noOI.maxUtility = +(
      noOI.financialMean - (0.5 * modelInputs.riskAversion * Math.pow(noOI.financialStdDev, 2))
    ).toFixed(basisPoints);
  };


/*------------------------------ CALCULATE PORTFOLIOS -------------------------------------------*/

  // Call calculatePortfolios to update portfolios' mean stdDev's at 10% intervals.
  var calculatePortfolios = function() {
    // Initialize the risky asset's weight to 0% and therefore the bond to 100%.
    var riskyAssetWeight = 0;

    for (var i = 0; i <= 10; i++) {

      /*----------- Calculate mean for the financialPortfolio ---------------------*/
      var financialMean = (riskyAssetWeight * modelInputs.market.avgReturn) +
      ((1 - riskyAssetWeight) * modelInputs.rF);

      financialPortfolio.mean.push(+financialMean.toFixed(basisPoints));
      /*---------------------------------------------------------------------------*/


      /*----------- Calculate standard deviation for the financialPortfolio -------*/
      var financialStdDev = riskyAssetWeight * modelInputs.market.stdDev;

      financialPortfolio.stdDev.push(+financialStdDev.toFixed(basisPoints));
      /*---------------------------------------------------------------------------*/


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


      // Increment the risky asset weight by factor of 10%.
      riskyAssetWeight += 0.1;
    }
  };


/*------------------------------ CALCULATE UTILITY CURVE ----------------------------------------*/
  var calculateUtiltyCurve = function() {

    //Initialize factors to calculate range of utility points on the utility curve.
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


/*------------------------------ MAP DATA FOR HIGHCHARTS ------------------------------------------------*/
  var mapDataForD3 = function() {

    // Map portfolio data to the format: [ [x, y], [x, y] ] ...
    var mapData = function(obj) {
      var mappedObj = obj.stdDev.map(function(element) {
        return [element];
      });
      mappedObj.forEach(function(element, i) {
        element[1] = obj.mean[i];
      });
      return mappedObj;
    };

    financialPortfolioData = mapData(financialPortfolio);
    totalWealthPortfolioData = mapData(totalWealthPortfolio);
    utilityCurveData = mapData(utilityCurve);
  };

/*------------------------------ FIRE HELPER FUNCTIONS ------------------------------------------------*/

  calculatePortfolios();
  calculateWeights();
  calculateUtiltyCurve();
  mapDataForD3();


/*------------------------------ RETURN USER OBJECT ------------------------------------------------*/
  // #### A user's optimal portfolio.
  var user = {
    OI: {}
  };

  // The individual metrics that will be rendered client side.
  user.OI['riskAversion'] = modelInputs.riskAversion;
  user.OI['correlation'] = modelInputs.correlation;
  user.OI['riskyAsset'] = optimalWeights.OI.riskyAsset;
  user.OI['bond'] = optimalWeights.OI.bond;
  user.OI['financialMean'] = optimalWeights.OI.financialMean;
  user.OI['financialSD'] = optimalWeights.OI.financialStdDev;
  user.OI['totalWealthMean'] = optimalWeights.OI.totalWealthMean;
  user.OI['totalWealthSD'] = optimalWeights.OI.totalWealthStdDev;
  user.OI['maxUtility'] = optimalWeights.OI.maxUtility;

  // Data for Highcharts to render client side.
  user['graphData'] = {
    financialPortfolio: financialPortfolioData,
    totalWealthPortfolio: totalWealthPortfolioData,
    utilityCurve: utilityCurveData
  };

  return user;

};




