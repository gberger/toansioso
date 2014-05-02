var checker = require('./checker');
var mailer = require('./mails/toa');
var async = require('async');

module.exports = function(db, concurrency) {
  console.log('Starting check...');

  var users = db.get('users');

  users.find({done: false}, function(err, all){
    var tasks = all.map(function(user){
      return function(callback){
        console.log('Checking user ' + user.email)
        checker(user.email, user.password, user.url).then(function(n){
          console.log('Have checked user ' + user.email)
          var done = n > 1
          if(done){
            mailer.send(user.email);
          }
          users.update({_id: user._id}, {done: done, last: new Date()});
          callback(null, done);
        }, function(){
          console.log('Error checking user ' + user.email);
          callback(null, null);
        });
      }
    });

    async.parallelLimit(tasks, concurrency);    
  });
};
