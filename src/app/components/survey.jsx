var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('material-ui/lib/dialog');
var FlatButton = require('material-ui/lib/flat-button');
var SurveyOptions = require('./surveyOptions.jsx');

var Headings = {
  "Question1": "With which types of savings or investments are you most comfortable?",
  "Question2": "After you make a savings or investment decision, you feel:",
  "Question3": "Say you invest $20,000. Each of the following answers shows the range of returns that your investment may experience after just one year, based on the underlying holdings. Which investment would you be most comfortable holding?",
  "Question4": "For the last five years, your investment has returned an average 10% per year—in line with other similar investments. However, it loses 20% over the next year. What do you do?",
  "Question5": "Which phrase best describes your take on life?"
}

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

              <h3>{Headings['Question1']}</h3>
              <SurveyOptions 
              name="Question1"
              q1Label="Money market accounts."
              q2Label="Government savings bonds."
              q3Label="Corporate bonds or bond funds."
              q4Label="Stocks or stock funds."/>

              <h3>{Headings['Question2']}</h3>
              <SurveyOptions 
              name="Question2"
              q1Label="Worried."
              q2Label="Satisfied."
              q3Label="Hopeful."
              q4Label="Invigorated."/>

              <h3>{Headings['Question3']}</h3>
              <SurveyOptions 
              name="Question2"
              q1Label="$21,000 – $19,000."
              q2Label="$23,000 – $17,000."
              q3Label="$27,000 – $13,000."
              q4Label="$27,000 – $13,000."/>

              <h3>{Headings['Question4']}</h3>
              <SurveyOptions 
              name="Question2"
              q1Label="Sell all of the investment."
              q2Label="Sell a portion of the investment."
              q3Label="Nothing."
              q4Label="Buy more of the same investment."/>

              <h3>{Headings['Question5']}</h3>
              <SurveyOptions 
              name="Question2"
              q1Label="Proceed with caution--take no unnecessary risks."
              q2Label="Take small, measurable risks and patiently pursue your dreams"
              q3Label="Prepare well, but follow your goals without fear."
              q4Label="No hesitation—-go for it!"/>

            </div>
        </Dialog>
      );
  } 
});

module.exports = Survey;
