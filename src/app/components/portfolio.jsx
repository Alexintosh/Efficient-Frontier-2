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

var MetricDescriptions = {
  "riskyAsset": "Number",
  "bond": "Number",
  "financialMean": "Number",
  "financialStd": "Number",
  "totalWealthMean": "Number",
  "totalWealthSD": "Number",
  "riskAversion": "Number",
  "correlation": "Number",
  "fractionOfWealth": "Number"
};



var PortfolioView = React.createClass({
  getInitialState: function() {
    return {
      user: null
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
            user: user
          });
        }
      },
      error: function(err) {
        console.error(err);
      }
    });
  },
  handleDescription: function(metric) {

    this.refs.info.show();
    console.log(MetricDescriptions[metric]);
  },

  render: function() {
    var self = this;
    var id = -1;
    var gridTiles = _.map(this.state.user, function(value, metric) {
      return (
        <GridTile
        key={++id}
        title={metric}
        actionIcon={<IconButton onClick={self.handleDescription.bind(null, metric)}><DescriptionIcon color="white"/></IconButton>}
        >
          <span className="metric">{value}</span>
        </GridTile>
        );
    });
    var user = this.state.user ? gridTiles : null;
    return (
      <div>
        <Dialog ref="info"></Dialog>
        <GridList cols={3} cellHeight={300} style={{width: 600, height: 600, overflowY: 'auto'}} >
          {user}
        </GridList>
      </div>
    );
  }
});

module.exports = PortfolioView;
