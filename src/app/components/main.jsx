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
var Promise = require('bluebird');

var Portfolio = require('./portfolio.jsx');

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
      showPortfolio: false,
      heading: 'Calculate Your Financial Portfolio',
      subHeading: 'In just three steps, this tool will calculate your Optimal Portfolio according to Modern Portfolio Theory standards. Click the button to get started!',
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
      showWealthSplit: true,
      heading: 'How much of your money are you planning to invest?',
      subHeading: 'Cool, just two more questions to go. Please estimate how much of your money you will be investing and hit enter when you\'re done.'
    });
  },
  handleSplit: function(value) {
    user.fractionOfWealth = +value;
    this.setState({
      showWealthSplit: false,
      showTickerInput: true,
      heading: 'What company do you work for?',
      subHeading: 'Great! Last question, we need to know what company you work for. Please enter the ticker for a publically traded company in the field below and hit enter when you\'re done.'
    });
  },
  handleTickerSubmit: function(value) {
    user.ticker = value;
    this.setState({
      showTickerInput: false,
      showPortfolio: true,
      heading: '',
      subHeading: ''
    });
  },
  componentDidMount: function() {
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
    var riskSurvey = this.state.showRiskSurvey ? <RaisedButton ref="risk-button" fullWidth={true} label="Start" onTouchTap={this.showDialog} /> : null;
    var wealthSplit = this.state.showWealthSplit ? <InputField hintText="Enter %" eventName="endSplit" /> : null;
    var tickerInput = this.state.showTickerInput ? <InputField hintText="Enter Ticker Symbol" eventName="endTickerInput" /> : null;
    var portfolio = this.state.showPortfolio ? <Portfolio user= {user} /> : null;
    return (
      <div className="main">
        <h1>{this.state.heading}</h1>
        <h3>{this.state.subHeading}</h3>
        <Survey ref="riskSurvey"/>
        {riskSurvey}
        {wealthSplit}
        {tickerInput}
        {portfolio}
      </div>
      );
  }
});

module.exports = Main;
  
