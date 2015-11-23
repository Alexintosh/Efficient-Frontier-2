/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var $ = require('jquery');
var request = require('request');
var MetricDescriptions = require('../imports/metricdescriptions');

/*----------------------REACT COMPONENTS-----------------------------*/
var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');
var IconButton = require('material-ui/lib/icon-button');
var DescriptionIcon = require('material-ui/lib/svg-icons/action/description');
var Description = require('./description.jsx');
var Graph = require('./graph.jsx');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var PortfolioView = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      userMetrics: null,
      graphData: null,
      MetricDescriptions: MetricDescriptions(this.props.ticker)
    };
  },

  componentDidMount: function() {
    var userData = this.props.user;
    var self = this;

    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/portfolio',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function(user) {
        if (typeof user.redirect == 'string') {
          window.location = user.redirect;
          return;
        } else if (self.isMounted()) {
          self.setState({
            user: user,
            userMetrics: user.OI,
            graphData: user.graphData
          });
        }
      },
      error: function(err) {
        console.error(err);
      }
    });
  },

  handleDescription: function(metric) {
    this.refs.info.updateContent(metric);
    this.refs.info.showDescription();
  },

  handleFormat: function(value, metric) {
    if (metric === 'riskAversion') { return value; }

    return Math.round(100 * value.toFixed(2)) + '%';
  },

  renderGridTiles: function() {
    var id = -1;
    var gridTileList = _.map(this.state.userMetrics, function(value, metric, user) {
      return (
          <GridTile className="tile" key={++id} >

            <div className="gridTitle"> {this.state.MetricDescriptions[metric].title} </div>

            <div className="iconInfo">
              <IconButton onClick={this.handleDescription.bind(null, metric)}>
                <DescriptionIcon color="black" />
              </IconButton>
            </div>

            <span className="metric animated flipInX"> {this.handleFormat(value, metric)} </span>

          </GridTile>
        );
    }.bind(this));

    return gridTileList;
  },

  formatUtilityCurveData: function() {
    var utilityCurveData = this.state.graphData.utilityCurve.map(function(el, i) {
      if (i === 0) { return el; } 
      if (i % 10 === 0) { return el; }
    });

    return utilityCurveData;
  },

  renderGraph: function() {
    return (
        <Graph 
        optimalPortfolio={[ [ this.state.userMetrics['totalWealthSD'] , this.state.userMetrics['totalWealthMean'] ] ]}
        financialPortfolio={this.state.graphData.financialPortfolio}
        totalWealthPortfolio={this.state.graphData.totalWealthPortfolio}
        highestUtility={this.formatUtilityCurveData()}
        />   
      );
  },

  render: function() {
    var GridTiles = this.state.user ? this.renderGridTiles() : null;
    var Graph = this.state.graphData && this.state.userMetrics ? this.renderGraph() : null;

    return (
      <div className="investmentView">

        <div id="chart">
          <h1>Your Optimal Financial Portfolio</h1>

          { Graph }

        </div>

        <div className="porfolioGrid">

          <Description ticker={this.props.ticker} ref="info" />

          <GridList
            cols={3}
            cellHeight={300}
            style={{width: 1000, height: 1000, overflowY: 'auto'}}
          >

            { GridTiles }

          </GridList>

        </div>

      </div>
    );
  }
});

module.exports = PortfolioView;
