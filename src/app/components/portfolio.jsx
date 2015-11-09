var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var Colors = require('material-ui/lib/styles/colors');
var FlatButton = require('material-ui/lib/flat-button');
var $ = require('jquery');

var PortfolioView = React.createClass({
  getInitialState: function() {
    return {
      riskyAsset: 'init'
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
            riskyAsset: user.riskyAsset,
            bond: user.bond,
            financialMean: user.financialMean,
            financialStd: user.financialStd,
            totalWealthMean: user.totalWealthMean,
            totalWealthSD: user.totalWealthSD,
            riskAversion: user.riskAversion,
            correlation: user.correlation,
            fractionOfWealth: user.fractionOfWealth
          });
        }
      },
      error: function(err) {
        console.error(err);
      }
    });
  },

  render: function() {
    return (
      <div>
        <h1>riskyAsset: {this.state.riskyAsset}</h1>
      </div>
    );
  }
});

module.exports = PortfolioView;
