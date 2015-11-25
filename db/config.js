// ## Setup Mongoose connection  with MongoDB

var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1';

// Currently configured for deployment. Change to this for development: 
// ```mongoose.connect('mongodb://127.0.0.1');```
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connected');
});

module.exports = db;
