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
  handleSubmit: function() {
    var val = this.refs.input.getValue();
    var e = this.props.eventName;
    var event = new CustomEvent(e, {'detail': val});
    window.dispatchEvent(event);
  },
  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <TextField
          ref="input"
          hintText={this.props.hintText}
          onEnterKeyDown={this.handleSubmit} />
      </div>
      );
  }
});

module.exports = InputField;
