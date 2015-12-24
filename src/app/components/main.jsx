/*----------------------- DEPENDENCIES------------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

/*----------------------REACT COMPONENTS-----------------------------*/
var RaisedButton = require('material-ui/lib/raised-button');
var InputField = require('./inputField.jsx');
var Portfolio = require('./portfolio.jsx');
var Survey = require('./survey.jsx');

// This is the user object which will be sent to the server
// on a request for a new portfolio.
var user = {
  surveyResults: [],
  fractionOfWealth: 0,
  ticker: ''
};

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var Main = React.createClass({
  getInitialState: function() {
    return {
      showRiskSurvey: true,
      showWealthSplit: false,
      showTickerInput: false,
      showPortfolio: false,
      heading: 'Calculate Your Financial Portfolio',
      subHeading: 'In just three steps, this tool will calculate your Optimal Portfolio according to \
                   Modern Portfolio Theory standards. Click the button to get started!',
    };
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

  showDialog: function() {
    this.refs.riskSurvey.showSurvey();
  },

  handleSurvey: function(results) {
    // Map from strings to numbers
    user.surveyResults = _.map(results, function(el) {
      return +el;
    });

    this.setState({
      showRiskSurvey: false,
      showWealthSplit: true,
      heading: 'How much of your money are you planning to invest?',
      subHeading: 'Cool, just two more questions to go. Please estimate what percentage of your total wealth \
                   you will be investing in financial assets and hit enter when you\'re done.'
    });
  },

  handleSplit: function(value) {
    user.fractionOfWealth = +(value / 100);
    this.setState({
      showWealthSplit: false,
      showTickerInput: true,
      heading: 'What company do you work for?',
      subHeading: 'Great! Last question, we need to know what company you work for. Please enter the ticker \
                   for a publically traded company in the field below and hit enter when you\'re done.'
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

  redirectToDocs: function() {
    window.location = window.location.href + "documentation"
  },

  renderRiskSurvey: function() {
    return  this.state.showRiskSurvey ?
            <div>
            <a href="https://github.com/claytonschneider/efficientfrontier">
              <img style={{position: 'absolute', top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" />
            </a>
              <RaisedButton
              ref="risk-button" 
              fullWidth={true}
              label="Start"
              onTouchTap={this.showDialog}
              />
              <RaisedButton
                style={{"margin-top": "50px"}}
                className="documentation-btn"
                label="documentation"
                fullWidth={true}
                secondary={true}
                onTouchTap={this.redirectToDocs}
              />
            </div>
            :
            null;
  },

  renderWealthSplit: function() {
    return  this.state.showWealthSplit ?
            <InputField 
            validate={true} 
            floatingLabelText="Enter a Percentage" 
            eventName="endSplit"
            />
            :
            null;
  },

  renderTickerInput: function() {
    return  this.state.showTickerInput ?
            <InputField 
            numberField={false}
            uppercase={true}
            floatingLabelText="Enter Ticker Symbol"
            eventName="endTickerInput"
            /> 
            :
            null;
  },

  renderPortfolio: function() {
    return  this.state.showPortfolio ?
            <Portfolio 
            heading={this.state.heading} 
            ticker={user.ticker} 
            user= {user}
            /> 
            : 
            null;
  },

  render:function() {
    return (
        <div className="app">
        
          <div className="main">
            <h1>{this.state.heading}</h1>
            <h3>{this.state.subHeading}</h3>

            <Survey ref="riskSurvey" />

            {this.renderRiskSurvey()}
            {this.renderWealthSplit()}
            {this.renderTickerInput()}

          </div>

          {this.renderPortfolio()}

        </div>
      );
  }
});

module.exports = Main;
  
