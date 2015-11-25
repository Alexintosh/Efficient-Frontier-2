/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var MetricDescriptions = require('../imports/metricdescriptions');

/*----------------------REACT COMPONENTS-----------------------------*/
var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');
var IconButton = require('material-ui/lib/icon-button');
var DescriptionIcon = require('material-ui/lib/svg-icons/action/description');
var Description = require('./description.jsx');
var Graph = require('./graph.jsx');
var Spinner = require('./spinner.jsx');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var PortfolioView = React.createClass({
  propTypes: {
    heading: React.PropTypes.string.isRequired,
    ticker: React.PropTypes.string.isRequired,
    user: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      loading: true,
      user: null,
      userMetrics: null,
      graphData: null,
      MetricDescriptions: MetricDescriptions(this.props.ticker)
    };
  },

  componentDidMount: function() {
    var userData = this.props.user;
    // Make request for a user's portfolio data.
    var xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.origin + '/portfolio');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
        var user = JSON.parse(xhr.responseText);
        if (user.redirect) {
          window.location = user.redirect;
          return;
        } else if (this.isMounted()) {

          this.setState({
            loading: false,
            user: user,
            userMetrics: user.OI,
            graphData: user.graphData
          });

        }
      } else {
        console.error('There was an error in the request.');
      }
    }.bind(this);

    xhr.send(JSON.stringify(userData));
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
    
    // Show spinner until Ajax request returns.
    if (this.state.loading) {
      return <Spinner />
    }

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
