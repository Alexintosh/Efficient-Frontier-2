/*******************************************************
                  CONFIG FOR HIGHCHARTS
*******************************************************/
module.exports = function(financialPortfolio, totalWealthPortfolio, highestUtility, OptimalPortfolio) {
  return {

    title: {
        text: 'Investment Opportunities, Optimal Portfolios and Utility Curves',
        x: -20
    },
    xAxis: {
        title: {
            text: 'Standard Deviation'
        }
    },
    yAxis: {
        title: {
            text: 'Expected Return'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        valueSuffix: '%'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    // Receive data from parent component
    series: [{
        name: 'Financial Portfolio',
        data: financialPortfolio
    }, {
        name: 'Total Wealth Portfolio',
        data: totalWealthPortfolio
    }, {
        name: 'Highest Acheiveable Utility',
        data: highestUtility
    }, {
        name: 'Optimal Portfolio',
        data: OptimalPortfolio,
    }]
  };
};
