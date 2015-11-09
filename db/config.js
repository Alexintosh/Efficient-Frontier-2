var mongoose = require('mongoose');
var path = require('path');
mongoose.connect('mongodb://127.0.0.1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connected');
});

module.exports = db;
