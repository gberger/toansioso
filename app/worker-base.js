#! /app/vendor/node/bin/node

module.exports = function(partition) {
  var goCheck = require('../app/go-check');
  var mongo = require('mongodb');
  var monk = require('monk');

  var db = monk(process.env.MONGOLAB_URI);
  var concurrency = Number(process.env.CONCURRENCY || 2)

  goCheck(db, concurrency, partition);
}