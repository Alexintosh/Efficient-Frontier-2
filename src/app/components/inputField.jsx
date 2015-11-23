/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');

/*----------------------REACT COMPONENTS-----------------------------*/
var TextField = require('material-ui/lib/text-field');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var propTypes = {
  numberField: React.PropTypes.bool,
  validate: React.PropTypes.bool,
  uppercase: React.PropTypes.bool,
  floatingLabelText: React.PropTypes.string.isRequired,
  eventName: React.PropTypes.string.isRequired
};

var InputField = React.createClass({
  getDefaultProps: function() {
    return {
      numberField: true
    };
  },

  getInitialState: function() {
    return {
      errorText: '',
      addAnimation: false,
    };
  },

  handleSubmit: function() {
    var integer = '^[0-9]+$';
    var val = this.refs.input.getValue();

    if (this.props.numberField && !val.match(integer) || val < 0 || val > 100) {
      this.setState({addAnimation: true});
    } else {
      var e = this.props.eventName;
      var event = new CustomEvent(e, {'detail': val});
      window.dispatchEvent(event);
    }
  },

  handleError: function(e) {
    if (this.props.uppercase) { this.handleCaps(e); }
    else { this.setErrorText(e); }

    this.setState({addAnimation: false});
  },

  handleCaps: function(e) {
    var val = e.target.value;
    this.refs.input.setValue(val.toUpperCase());
  },

  setErrorText: function(e) {
    var integer = '^[0-9]+$';
    var val = e.target.value;

    if (!val.match(integer)) {
      this.setState({errorText: 'Please enter a number.'});
    } else if (val < 0 || val > 100) {
      this.setState({errorText: 'Please enter a number between 1 and 100.'});
    } else {
      this.setState({errorText: ''});
    }
  },
  
  render: function() {
    return (
        <div className={this.state.addAnimation ? 'animated shake' : ''}>
          <h2>{this.props.title}</h2>

          <TextField
            ref="input"
            fullWidth={true}
            floatingLabelText={this.props.floatingLabelText}
            errorText={this.props.validate ? this.state.errorText : null}
            onChange={this.handleError}
            onEnterKeyDown={this.handleSubmit}
          />

        </div>
      );
  }
});

InputField.propTypes = propTypes;

module.exports = InputField;
