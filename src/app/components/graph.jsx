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

var propTypes: {
  financialPortfolio: React.PropTypes.array.isRequired,
  totalWealthPortfolio: React.PropTypes.array.isRequired,
  highestUtility: React.PropTypes.array.isRequired,
  optimalPortfolio: React.PropTypes.array.isRequired,
};

var Graph = React.createClass({
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

Graph.propTypes = propTypes;

module.exports = Graph;
