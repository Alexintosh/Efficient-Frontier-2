(function () {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var _ = require('underscore');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  var Main = require('./components/main.jsx'); // Our custom react component

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  /*-----------USER OBJ---------*/
  var user = {
    surveyResults: [],
    fractionOfWealth: 0,
    ticker: ''
  };

  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  var App = React.createClass({
    render: function() {
      return (
          <Main />
        );
    }
  });

  ReactDOM.render(<App />, document.getElementById('app'));

})();
