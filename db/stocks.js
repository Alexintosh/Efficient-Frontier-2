var mongoose = require('mongoose');
var db = require('./config');

var stockSchema = new mongoose.Schema({
  ticker: String,
  correlation: Number
});

var Stock = mongoose.model('Stock', stockSchema);

module.exports.schema = stockSchema;
module.exports.model = Stock;
