var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('material-ui/lib/dialog');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');
var RadioButton = require('material-ui/lib/radio-button');

var surveyOptions = React.createClass({
  getDefaultProps: function() {
    return {
      marginBottom: 16
    };
  },
  render: function() {
    return (
        <RadioButtonGroup name={this.props.name} defaultSelected="q1">
        <RadioButton
          value="q1"
          label={this.props.q1Label}
          style={{marginBottom: this.props.marginBottom}} />
        <RadioButton
          value="q2"
          label={this.props.q2Label}
          style={{marginBottom: this.props.marginBottom}}/>
        <RadioButton
          value="q3"
          label={this.props.q3Label}
          style={{marginBottom: this.props.marginBottom}}/>
        <RadioButton
          value="q4"
          label={this.props.q4Label}
          style={{marginBottom: this.props.marginBottom}}/>
        </RadioButtonGroup>
      );
  }
});

module.exports = surveyOptions;
