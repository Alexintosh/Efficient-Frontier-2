/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

/*----------------------REACT COMPONENTS-----------------------------*/
var Dialog = require('material-ui/lib/dialog');
var FlatButton = require('material-ui/lib/flat-button');
var SurveyOptions = require('./surveyOptions.jsx');
var surveyQuestions = require('../imports/surveyQuestions');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var Survey = React.createClass({
  showSurvey: function() {
    this.refs.hello.show();
  },

  hideSurvey: function() {
    this.refs.hello.dismiss();
  },

  getResults: function() {
    var results = [];
    // Push each survey question into results and return it
    _.each(this.refs, function(el, ref) {
      if (ref.slice(0, 1) === 'q') {
        results.push(el.getValue());
      }
    }.bind(this));

    this.hideSurvey();

    var event = new CustomEvent('endSurvey', {'detail': results});
    window.dispatchEvent(event);
  },

  renderQuestions: function() {
    var questions = surveyQuestions.map(function(question, i) {
      var ref = 'q' + (i + 1);
      return (
          <span key={i}>
            <p className="surveyHeading">{question.heading}</p>
            <SurveyOptions
            ref={ref}
            name={question.name}
            q1Label={question.options[0]}
            q2Label={question.options[1]}
            q3Label={question.options[2]}
            q4Label={question.options[3]}
            />
          </span>
        );
    });

    return questions;
  },

  render:function() {
    var customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.hideSurvey} 
        key={0} 
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.getResults} 
        key={1}
      />
    ];

    return (
        <Dialog ref="hello" modal={true} title="Risk Assessment" actions={customActions}
          autoDetectWindowHeight={true} autoScrollBodyContent={true}>

            <div style={{height: '1200px'}}>

              {this.renderQuestions()}

            </div>
        </Dialog>
      );
  } 
});

module.exports = Survey;
