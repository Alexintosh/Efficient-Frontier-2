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
  showDialog: function() {
    this.refs.riskSurvey.showSurvey();
  },
  handleSurvey: function(results) {
    user.surveyResults = _.map(results, function(el) {
      return +el;
    });

    console.log(user.surveyResults);
  },
  componentWillMount: function() {
    window.addEventListener('endSurvey', function(e) {
      this.handleSurvey(e.detail);
    }.bind(this));
  },
  render:function() {
    return (
      <div>
        <Survey ref="riskSurvey"/>
        <RaisedButton label="Default" onTouchTap={this.showDialog}/>
      </div>
      );
  }
});

module.exports = Main;
  
