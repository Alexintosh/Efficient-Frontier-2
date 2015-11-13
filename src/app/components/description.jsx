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
var Description = React.createClass({
  getInitialState: function() {
    return MetricDescriptions(this.props.ticker);
  },

  showDescription: function() {
    this.refs.info.show();
  },

  updateContent: function(metric) {
    var f = function() {
      return {
        title: this.state[metric].title,
        description: this.state[metric].content  
      }
    }.bind(this);

    // Set the state to metric that was clicked on in the Portfolio
    this.setState(f());
  },

  hideModal: function() {
    this.refs.info.dismiss();
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
            key={0} />
          ]}
        >
          
          {this.state.description}

        </Dialog>
      );
  }
});

module.exports = Description;
