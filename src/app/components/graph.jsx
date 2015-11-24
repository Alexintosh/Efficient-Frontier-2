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
  propTypes: {
    financialPortfolio: React.PropTypes.array.isRequired,
    totalWealthPortfolio: React.PropTypes.array.isRequired,
    highestUtility: React.PropTypes.array.isRequired,
    optimalPortfolio: React.PropTypes.array.isRequired,
  },

  getInitialState: function() {
    return {
      config: Config(this.props.financialPortfolio, this.props.totalWealthPortfolio, 
                     this.props.highestUtility, this.props.optimalPortfolio)
    };
  },

  render: function() {
    return (
        <Highcharts config={this.state.config} />
      );
  }
});

module.exports = Graph;
