/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');

/*----------------------REACT COMPONENTS-----------------------------*/
var RadioButtonGroup = require('material-ui/lib/radio-button-group');
var RadioButton = require('material-ui/lib/radio-button');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var surveyOptions = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    q1Label: React.PropTypes.string.isRequired,
    q2Label: React.PropTypes.string.isRequired,
    q3Label: React.PropTypes.string.isRequired,
    q4Label: React.PropTypes.string.isRequired,
    marginBottom: React.PropTypes.number
  },
  
  getDefaultProps: function() {
    return {
      marginBottom: 16
    };
  },

  getInitialState: function() {
    return {
      buttonValues: [
        '5.00',
        '3.75',
        '2.50',
        '1.25'
      ]
    }
  },

  getValue: function() {
    return this.refs.button.getSelectedValue();
  },

  renderOptions: function() {
    var options = this.state.buttonValues.map(function(el, i) {
      var q = 'q' + (i + 1) + 'Label';
      return (
          <RadioButton
            key={i}
            value={el}
            label={this.props[q]}
            style={{marginBottom: this.props.marginBottom}}
          />
        );
    }.bind(this));

    return options;
  },

  render: function() {
    return (
        <RadioButtonGroup 
          ref="button" 
          name={this.props.name} 
          defaultSelected={this.state.buttonValues[0]}
        >

          {this.renderOptions()}

        </RadioButtonGroup>
      );
  }
});

module.exports = surveyOptions;
