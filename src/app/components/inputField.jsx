/** In this file, we create a React component which incorporates components provided by material-ui */
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var Colors = require('material-ui/lib/styles/colors');
var FlatButton = require('material-ui/lib/flat-button');

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
    var reg = '^[0-9]+$';
    var val = this.refs.input.getValue();

    if (this.props.numberField && !val.match(reg) || val < 0 || val > 100) {
      this.setState({addAnimation: true});
    } else {
      var e = this.props.eventName;
      var event = new CustomEvent(e, {'detail': val});
      window.dispatchEvent(event);
    }

  },
  handleError: function(e) {
    if (this.props.uppercase) {
      this.handleCaps(e);
      return;
    }

    var reg = '^[0-9]+$';
    var val = e.target.value;

    if (!val.match(reg)) {
      this.setState({errorText: 'Please enter a number.'});
    } else if (val < 0 || val > 100) {
      this.setState({errorText: 'Please enter a number between 1 and 100.'});
    } else {
      this.setState({errorText: ''});
    }

    this.setState({addAnimation: false});
  },
  handleCaps: function(e) {
    var val = e.target.value;
    this.refs.input.setValue(val.toUpperCase());
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
          onEnterKeyDown={this.handleSubmit} />
      </div>
      );
  }
});

// && this.props.uppercase ? this.handleCaps : null

module.exports = InputField;
