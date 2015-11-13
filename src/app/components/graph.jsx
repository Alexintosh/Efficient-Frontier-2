
/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');

/*----------------------REACT COMPONENTS-----------------------------*/
var Highcharts = require('react-highcharts/dist/bundle/highcharts');
var Theme = require('../imports/theme');
var Config = require('../imports/graphconfig');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/

// Set the styling for the Graph
Highcharts.Highcharts.setOptions(Theme);

var Graph = React.createClass({
  getInitialState: function() {
    var p = this.props;
    return {
      config: Config(p.financialPortfolio, p.totalWealthPortfolio, 
                     p.highestUtility, p.OptimalPortfolio)
    };
  },

  render: function() {
    return (
        <Highcharts config={this.state.config}></Highcharts>
      );
  }
});

module.exports = Graph;
