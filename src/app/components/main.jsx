/** In this file, we create a React component which incorporates components provided by material-ui */
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var RaisedButton = require('material-ui/lib/raised-button');
var Dialog = require('material-ui/lib/dialog');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var Colors = require('material-ui/lib/styles/colors');
var FlatButton = require('material-ui/lib/flat-button')

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
      removeRiskSurvey: false
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
      removeRiskSurvey: true
    });
  },
  componentWillMount: function() {
    window.addEventListener('endSurvey', function(e) {
      this.handleSurvey(e.detail);
    }.bind(this));
  },
  render:function() {
    var riskSurvey = this.state.removeRiskSurvey ? null : <RaisedButton ref="risk-button" label="Default" onTouchTap={this.showDialog} />;
    return (
      <div>
        <Survey ref="riskSurvey"/>
        {riskSurvey}
      </div>
      );
  }
});

module.exports = Main;
  
