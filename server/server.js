var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require("http");
var app = express();
var helpers = require('../utils/helpers');
var requestHandlers = require('../utils/requesthandlers');


app.use(bodyParser.json());

//Serve static html to client
app.use(express.static(__dirname + '/../build'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.post('/portfolio', function(req, res){
  var user = req.body[0];
  requestHandlers.handleRequest(user).then(function(portfolio) {
    console.log(portfolio);
    res.send(portfolio);
  })
  .catch(function(err) {
    console.log(err);
  });

});

app.listen(process.env.PORT || 5000);
