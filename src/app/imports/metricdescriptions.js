/*******************************************************
              DESCRIPTION OF METRICS
*******************************************************/
var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit elementum vestibulum. Integer vel elementum ante. Aenean gravida risus ut aliquam pulvinar. Curabitur ipsum risus, commodo eget ex sed, feugiat pretium eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. In et sem et dolor sagittis dictum. In condimentum nisl vel est rhoncus condimentum. Aliquam semper volutpat lorem ut volutpat. Quisque arcu nulla, eleifend scelerisque egestas id, suscipit auctor nisl. Mauris vulputate massa in turpis porttitor rutrum. Sed vestibulum ex et tincidunt rutrum.";

// Required by [description.jsx](./../components/description.html)
module.exports = function(ticker) {
  return {
    "riskyAsset": {
      title: "Stock Allocation",
      content: lorem,
    },
    "bond": {
      title: "Bond Allocation",
      content: lorem,
    },
    "financialMean": {
      title: "Financial Portfolio μ",
      content: lorem,
    },
    "financialSD": {
      title: "Financial Portfolio σ",
      content: lorem,
    },
    "totalWealthMean": {
      title: "Total Wealth Portfolio μ",
      content: lorem
    },
    "totalWealthSD": {
      title: "Total Wealth Portfolio σ",
      content: lorem
    },
    "riskAversion": {
      title: "Risk Aversion (1 - 5)",
      content: lorem
    },
    "correlation": {
      title: "Correlation of " + ticker + " to Market",
      content: lorem
    },
    "maxUtility": {
      title: "Maximum Achieveable Utility",
      content: lorem
    }
  };
};
