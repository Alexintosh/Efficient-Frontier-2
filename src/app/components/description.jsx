var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var RaisedButton = require('material-ui/lib/raised-button');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var Colors = require('material-ui/lib/styles/colors');
var FlatButton = require('material-ui/lib/flat-button');
var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');
var IconButton = require('material-ui/lib/icon-button');
var DescriptionIcon = require('material-ui/lib/svg-icons/action/description');
var $ = require('jquery');

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit elementum vestibulum. Integer vel elementum ante. Aenean gravida risus ut aliquam pulvinar. Curabitur ipsum risus, commodo eget ex sed, feugiat pretium eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. In et sem et dolor sagittis dictum. In condimentum nisl vel est rhoncus condimentum. Aliquam semper volutpat lorem ut volutpat. Quisque arcu nulla, eleifend scelerisque egestas id, suscipit auctor nisl. Mauris vulputate massa in turpis porttitor rutrum. Sed vestibulum ex et tincidunt rutrum.";

var Description = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      description: '',
      MetricDescriptions: {
        "riskyAsset": {
          title: "Stock Allocation",
          content: lorem,
        },
        "bond": {
          title: "Bond Allocation",
          content: lorem,
        },
        "financialMean": {
          title: "Financial Portfolio μ",
          content: lorem,
        },
        "financialSD": {
          title: "Financial Portfolio σ",
          content: lorem,
        },
        "totalWealthMean": {
          title: "Total Wealth Portfolio μ",
          content: lorem
        },
        "totalWealthSD": {
          title: "Total Wealth Portfolio σ",
          content: lorem
        },
        "riskAversion": {
          title: "Risk Aversion (1 - 5)",
          content: lorem
        },
        "correlation": {
          title: "Correlation of " + this.props.ticker + " to Market",
          content: lorem
        },
        "fractionOfWealth": {
          title: "% of Wealth in Financial Assets",
          content: lorem
        }
      }
    };
  },
  showDescription: function() {
    this.refs.info.show();
  },
  updateContent: function(metric) {
    var self = this;
    this.setState({
      title: self.state.MetricDescriptions[metric].title,
      description: self.state.MetricDescriptions[metric].content
    });
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
        actions={[<FlatButton
          label="Okay"
          secondary={true}
          onTouchTap={this.hideModal}
          key={0} />]}
        >
        {this.state.description}
      </Dialog>
      );
  }
});

module.exports = Description;
