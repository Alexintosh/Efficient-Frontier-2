e/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');

/*----------------------REACT COMPONENTS-----------------------------*/
var RadioButtonGroup = require('material-ui/lib/radio-button-group');
var RadioButton = require('material-ui/lib/radio-button');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var surveyOptions = React.createClass({
  getDefaultProps: function() {
    return {
      marginBottom: 16
    };
  },
  getValue: function() {
    return this.refs.button.getSelectedValue();
  },
  render: function() {
    return (
        <RadioButtonGroup ref="button" name={this.props.name} defaultSelected="5.00">
        <RadioButton
          value="5.00"
          label={this.props.q1Label}
          style={{marginBottom: this.props.marginBottom}} />
        <RadioButton
          value="3.75"
          label={this.props.q2Label}
          style={{marginBottom: this.props.marginBottom}}/>
        <RadioButton
          value="2.50"
          label={this.props.q3Label}
          style={{marginBottom: this.props.marginBottom}}/>
        <RadioButton
          value="1.25"
          label={this.props.q4Label}
          style={{marginBottom: this.props.marginBottom}}/>
        </RadioButtonGroup>
      );
  }
});

module.exports = surveyOptions;
