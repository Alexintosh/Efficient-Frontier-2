/** In this file, we create a React component which incorporates components provided by material-ui */
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var RaisedButton = require('material-ui/lib/raised-button');
var Dialog = require('material-ui/lib/dialog');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var Colors = require('material-ui/lib/styles/colors');
var FlatButton = require('material-ui/lib/flat-button');
var InputField = require('./inputField.jsx');

/*-----------USER OBJ---------*/
var user = {
  surveyResults: [],
  fractionOfWealth: 0,
  ticker: ''
};

/*-----------CUSTOM---------*/
var Survey = require('./survey.jsx');

var Main = React.createClass({
  getInitialState: function() {
    return {
      showRiskSurvey: true,
      showWealthSplit: false,
      showTickerInput: false,
    };
  },
  showDialog: function() {
    this.refs.riskSurvey.showSurvey();
  },
  handleSurvey: function(results) {
    //map from strings to numbers
    user.surveyResults = _.map(results, function(el) {
      return +el;
    });

    this.setState({
      showRiskSurvey: false,
      showWealthSplit: true
    });
  },
  handleSplit: function(value) {
    user.fractionOfWealth = value;
    this.setState({
      showWealthSplit: false,
      showTickerInput: true
    });
  },
  handleTickerSubmit: function(value) {
    user.ticker = value;
    this.setState({
      showTickerInput: false
    });

    this.requestPorfolio(user);
  },

  requestPorfolio: function() {
    
  },
  componentWillMount: function() {
    window.addEventListener('endSurvey', function(e) {
      this.handleSurvey(e.detail);
    }.bind(this));

    window.addEventListener('endSplit', function(e) {
      this.handleSplit(e.detail);
    }.bind(this));

    window.addEventListener('endTickerInput', function(e) {
      this.handleTickerSubmit(e.detail);
    }.bind(this));
  },
  render:function() {
    var riskSurvey = this.state.showRiskSurvey ? <RaisedButton ref="risk-button" label="Default" onTouchTap={this.showDialog} /> : null;
    var wealthSplit = this.state.showWealthSplit ? <InputField hintText="Enter %" eventName="endSplit" /> : null;
    var tickerInput = this.state.showTickerInput ? <InputField hintText="Enter Ticker Symbol" eventName="endTickerInput" /> : null;
    return (
      <div>
        <Survey ref="riskSurvey"/>
        {riskSurvey}
        {wealthSplit}
        {tickerInput}
      </div>
      );
  }
});

module.exports = Main;
  
