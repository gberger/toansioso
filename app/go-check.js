var checker = require('../app/checker');
var mailer = require('../app/mailer');
var async = require('async')

var queue = async.queue(function(user, callback) {
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
}, 2)

var populateQueue = function(db){
  var users = db.get('users');
  users.find({done: false}, function(err, all){
    all.forEach(function(user){
      queue.push(user);
    })
  })
}

module.exports = function(db) {
  populateQueue(db);
}