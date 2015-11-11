(function () {
/*-------------------------DEPENDENCIES-----------------------------*/
  var React = require('react');
  var ReactDOM = require('react-dom');
  var injectTapEventPlugin = require('react-tap-event-plugin');

/*----------------------REACT COMPONENTS-----------------------------*/
  var Main = require('./components/main.jsx');


/*********************************************************************
                          COMPONENT BODY
**********************************************************************/

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  injectTapEventPlugin();

  var App = React.createClass({
    render: function() {
      return (
          <Main />
        );
    }
  });

  // Render the main app react component into the app div.
  ReactDOM.render(<App />, document.getElementById('app'));

})();
