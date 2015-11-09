var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('material-ui/lib/dialog');
var FlatButton = require('material-ui/lib/flat-button');
var SurveyOptions = require('./surveyOptions.jsx');

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
        <Dialog ref="hello" modal={true} title="Risk Assessment" actions={customActions}
          autoDetectWindowHeight={true} autoScrollBodyContent={true}>

            <div style={{height: '2000px'}}>

              <SurveyOptions 
              name="Question 1"
              q1Label="Money market accounts."
              q2Label="Government savings bonds."
              q3Label="Corporate bonds or bond funds."
              q4Label="Stocks or stock funds."/>
              
            </div>
        </Dialog>
      );
  } 
});

module.exports = Survey;
