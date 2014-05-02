var checker = require('../app/checker');
var mailer = require('../app/mailer');
var async = require('async');

var makeQueue = function(concurrency){
  return async.queue(function(user, callback) {
    console.log('Checking user ' + user.email)
    checker(user.email, user.password, user.url).then(function(n){
      console.log('Have checked user ' + user.email)
      var done = n > 1
      if(done){
        mailer.send(user.email);
        users
      }
      users.update({_id: user._id}, {done: done, last: new Date()});
      callback();
    });
  }, concurrency);
}

var populateQueue = function(db, concurrency){
  var queue = makeQueue(concurrency);

  var users = db.get('users');
  users.find({done: false}, function(err, all){
    all.forEach(function(user){
      queue.push(user);
    })
  })
}

module.exports = function(db, concurrency) {
  populateQueue(db, concurrency);
}