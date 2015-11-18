// # Table of Contents


// # Back-End

// ## Server

// #### [server.js](./server.html)
// * Heroku server file.

// ## DB

// #### [config.js](./config.html)
// * Configuration file for MongoDB database.

// #### [board.js](./board.html)
// * Mongoose model for stocks.

// ## Utils

// #### [formulae.js](./formulae.html)
// * Formulas to calculate Optimal Financial Portfolio and associated metrics.

// #### [helpers.js](./helpers.html)
// * Helper methods for CSV parsing and data formatting.

// #### [requesthandlers.js](./requesthandlers.html)
// * Handle a request to /portfolio and the associated calculations.

// #### [sp500data.js](./sp500data.html)
// * S&P500 data for past two years, used in correlation calculations.



// # Front-End

// ## Components

// #### [app.jsx](./app.html)
// App-level component for React to render to.

// #### [main.jsx](./main.html)
// Main view where user interaction happens in 4 stages: Risk Survey, Wealth Split Survey, Stock Ticker Survey, and finally rendering of User Metrics.
// All following the components are children of this component.

// #### [survey.jsx](./survey.html)
// 1st Stage: Risk Assessment Survey

// #### [surveyOptions.jsx](./surveyOptions.html)
// Child of [survey.jsx](./survey.html) -- renders question groups in the Risk Survey.

// #### [inputField.jsx](./inputField.html)
// 2nd & 3rd Stage: Wealth Split Survey & Stock Ticker Input
// State of the input field is handled by [main.jsx](./main.html)

// #### [portfolio.jsx](./portfolio.html)
// 4th & Final Stage: Optimal Portfolio Rendering

// #### [graph.jsx](./graph.html)
// Child of [portfolio.jsx](./portfolio.html), renders portfolio graph

// #### [description.jsx](./description.html)
// Child of [portfolio.jsx](./portfolio.html), renders clickable pop-up dialogs
// with information about each metric.

// ## Imports

// #### [metricdescriptions.js](./metricdescriptions.html)
// Child of [description.jsx](./description.html)

// #### [theme.js](./theme.html)
// CSS theme for [graph.jsx](./graph.html)
