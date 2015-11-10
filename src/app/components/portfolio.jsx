var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var RaisedButton = require('material-ui/lib/raised-button');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var Colors = require('material-ui/lib/styles/colors');
var FlatButton = require('material-ui/lib/flat-button');
// var Table = require('material-ui/lib/table/table');
// var TableFooter = require('material-ui/lib/table/table-footer');
// var TableBody = require('material-ui/lib/table/table-body');
// var TableRow = require('material-ui/lib/table/table-row');
// var TableRowColumn = require('material-ui/lib/table/table-row-column');
// var TableHeader = require('material-ui/lib/table/table-header');
// var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');
var IconButton = require('material-ui/lib/icon-button');
var DescriptionIcon = require('material-ui/lib/svg-icons/action/description');
var $ = require('jquery');

var Description = require('./description.jsx');
var Graph = require('./graph.jsx');

// var MetricDescriptions = {
//   "riskyAsset": "Stock Allocation",
//   "bond": "Bond Allocation",
//   "financialMean": "Financial Portfolio μ",
//   "financialSD": "Financial Portfolio σ",
//   "totalWealthMean": "Total Wealth Portfolio μ",
//   "totalWealthSD": "Total Wealth Portfolio σ",
//   "riskAversion": "Risk Aversion (1 - 5)",
//   "correlation": "Correlation of X to Market",
//   "fractionOfWealth": "% of Wealth in Financial Assets"
// };



var PortfolioView = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      userMetrics: null,
      graphData: null,
      MetricDescriptions: {
        "riskyAsset": "Stock Allocation",
        "bond": "Bond Allocation",
        "financialMean": "Financial Portfolio μ",
        "financialSD": "Financial Portfolio σ",
        "totalWealthMean": "Total Wealth Portfolio μ",
        "totalWealthSD": "Total Wealth Portfolio σ",
        "riskAversion": "Risk Aversion (1 - 5)",
        "correlation": "Correlation of X to Market",
        "maxUtility": "Maximum Achieveable Utility"
      }
    };
  },
  componentDidMount: function() {
    var userData= this.props.user;
    var self = this;
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/portfolio',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function(user) {
        console.log(user);

        if (self.isMounted()) {
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
    if (metric === 'riskAversion') {
      return value;
    }

    return Math.round(100 * value.toFixed(2)) + '%';
  },

  render: function() {
    var self = this;
    var id = -1;
    var gridTiles = _.map(this.state.userMetrics, function(value, metric, user) {
      return (
        <GridTile
        className="tile"
        title = ""
        key={++id}
        >
          <div className="gridTitle">{metric === 'correlation' ? ('Correlation of ' + self.props.ticker + ' to Market') : self.state.MetricDescriptions[metric]}</div>
          <div className="iconInfo"><IconButton onClick={self.handleDescription.bind(null, metric)}><DescriptionIcon color="black"/></IconButton></div>
          <span className="metric animated flipInX">{self.handleFormat(value, metric)}</span>
        </GridTile>
        );
    });
    var user = this.state.user ? gridTiles : null;
    return (
      <div className="investmentView">
      <div id="chart">
        <h1>Your Optimal Financial Portfolio</h1>
        <Graph />
      </div>

        <div className="porfolioGrid">
          <Description ticker={this.props.ticker} ref="info" />
          <GridList cols={3} cellHeight={300} style={{width: 1000, height: 1000, overflowY: 'auto'}} >
            {user}
          </GridList>
        </div>
      </div>
    );
  }
});

module.exports = PortfolioView;
