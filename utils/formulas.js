var basisPoints = 4;

var inputs = {
  rF: 0.01,
  mktAvg: 0.06,
  mktSD: 0.16,
  incomeAvg: 0.15,
  incomeSD: 0.25
};

exports.inputs = inputs;

exports.riskyAsset = function(riskAversion, correlation, fractionOfWealth) {
  return +(
          (inputs.mktAvg - inputs.rF -
          (riskAversion * correlation * inputs.incomeSD * inputs.mktSD) +
          (riskAversion * fractionOfWealth * correlation * inputs.incomeSD * inputs.mktSD)) /
          (riskAversion * fractionOfWealth * Math.pow(inputs.mktSD, 2))
          ).toFixed(basisPoints);
};

exports.bond = function(riskAversion, correlation, fractionOfWealth) {
  return +(1 - exports.riskyAsset(riskAversion, correlation, fractionOfWealth)).toFixed(basisPoints);
};

exports.financialMean = function(riskAversion, correlation, fractionOfWealth) {
  var riskyAsset = exports.riskyAsset(riskAversion, correlation, fractionOfWealth);
  return +(
          (riskyAsset * inputs.mktAvg) +
          ((1 - riskyAsset) * inputs.rF)
          ).toFixed(basisPoints);
};

exports.financialSD = function(riskAversion, correlation, fractionOfWealth) {
  return +(inputs.mktSD * exports.riskyAsset(riskAversion, correlation, fractionOfWealth)).toFixed(basisPoints);
};

exports.totalWealthMean = function(riskAversion, correlation, fractionOfWealth) {
  return +(
          (fractionOfWealth * exports.financialMean(riskAversion, correlation, fractionOfWealth)) +
          ((1 - fractionOfWealth) * inputs.incomeAvg)
          ).toFixed(basisPoints);
};

exports.totalWealthSD = function(riskAversion, correlation, fractionOfWealth) {
  var riskyAsset = exports.riskyAsset(riskAversion, correlation, fractionOfWealth);
  var financialSD = exports.financialSD(riskAversion, correlation, fractionOfWealth);

  return +(Math.sqrt(
    (Math.pow(fractionOfWealth, 2) * Math.pow(financialSD, 2)) +
    (Math.pow((1 - fractionOfWealth), 2) * Math.pow(inputs.incomeSD, 2)) +
    (2 * fractionOfWealth * (1 - fractionOfWealth) * riskyAsset *
     correlation * inputs.mktSD * inputs.incomeSD)
    )).toFixed(basisPoints);
};

exports.maxUtility = function(riskAversion, correlation, fractionOfWealth) {
  // Maximum utility considering outside income factors
  var totalWealthMean = exports.totalWealthMean(riskAversion, correlation, fractionOfWealth);
  var totalWealthSD = exports.totalWealthSD(riskAversion, correlation, fractionOfWealth);

  return +(
      totalWealthMean - (0.5 * riskAversion * Math.pow(totalWealthSD, 2))
    ).toFixed(basisPoints);
};

exports.computeRiskAversion = function(surveyResults) {
  return +Math.round((
      (surveyResults[0] + surveyResults[1] + surveyResults[2] + surveyResults[3] + surveyResults[4]) / 5
    ));
};
