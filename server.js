// ## Dependencies

var express = require('express');
var bodyParser = require('body-parser');
var http = require("http");
var app = express();
var helpers = require('./utils/helpers');
var requestHandlers = require('./utils/requesthandlers');

app.use(bodyParser.json());

// Serve static html to client
app.use('/', express.static(__dirname + '/build'));

// Static folder for serving documentation
app.use('/documentation', express.static(__dirname + '/docs'));

// ## Routes

// ** Home page **
app.get('/', function(req, res){
  res.render('index');
});

// ** Documentation Page **
app.get('/documentation', function(req, res) {
  res.sendFile(__dirname + '/docs/tableOfContents.html');
});

// ** Get a user's optimal portfolio **
app.post('/portfolio', function(req, res){
  var user = req.body;
  // Invoke promise chain from [helpers.js](./helpers.html)
  requestHandlers.handleRequest(user).then(function(portfolio) {
    res.send(portfolio);
  })
  .catch(function(err) {
    console.error(err);
    // Portfolio not found, redirect to 404
    res.send({redirect: '/404.html'});
  });
});

// ** Wildcard route **
app.get('/*', function(req, res) {
  res.redirect('404.html');
});

// ** Start App **
app.listen(process.env.PORT || 5000);
