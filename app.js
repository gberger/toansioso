var goCheck = require('./app/go-check');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI);


app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  req.db = db;
  next();
})

app.post('/register', require('./app/register'));

var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Listening on " + port);
})

setInterval(function(){
  console.log('Starting check...');
  goCheck(db);
}, 2*60*1000);
