var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('material-ui/lib/dialog');
var FlatButton = require('material-ui/lib/flat-button')

var Survey = React.createClass({
  showSurvey: function() {
    this.refs.hello.show();
  },
  hideSurvey: function() {
    this.refs.hello.dismiss();
  },
  render:function() {
    var customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.hideSurvey} 
        key={0} />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} 
        key={1} />
    ];
    return (
        <Dialog ref="hello" title="Dialog With Scrollable Content" actions={customActions}
          autoDetectWindowHeight={true} autoScrollBodyContent={true}>
            <div style={{height: '2000px'}}>Really long content</div>
        </Dialog>
      );
  } 
});

module.exports = Survey;
