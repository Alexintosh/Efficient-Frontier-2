/*-------------------------DEPENDENCIES-----------------------------*/
var React = require('react');
var ReactDOM = require('react-dom');
var MetricDescriptions = require('../imports/metricdescriptions');

/*----------------------REACT COMPONENTS-----------------------------*/
var Dialog = require('material-ui/lib/dialog');
var FlatButton = require('material-ui/lib/flat-button');

/*********************************************************************
                          COMPONENT BODY
**********************************************************************/
var propTypes = {
  ticker: React.PropTypes.string.isRequired
};

var Description = React.createClass({
  getInitialState: function() {
    return MetricDescriptions(this.props.ticker);
  },

  // Show pop-up modal with information about the metric that was clicked on.
  showDescription: function() {
    this.refs.info.show();
  },

  hideModal: function() {
    this.refs.info.dismiss();
  },
  
  // Set the state to the metric that was clicked on.
  updateContent: function(metric) {
    var f = function() {
      return {
        title: this.state[metric].title,
        description: this.state[metric].content  
      }
    }.bind(this);

    this.setState(f());
  },

  render: function() {
    return (
        <Dialog title={this.state.title}
          ref="info"
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          actions={[
            <FlatButton
            label="Okay"
            secondary={true}
            onTouchTap={this.hideModal}
            key={0}
            />
          ]}
        >
          
          {this.state.description}

        </Dialog>
      );
  }
});

Description.propTypes = propTypes;

module.exports = Description;
