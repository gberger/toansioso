var checker = require('./checker');
var mailer = require('./mails/toa');
var async = require('async');

module.exports = function(db, concurrency) {
  console.log('Starting check...');

  var users = db.get('users');

  users.find({done: false}, function(err, all){
    var tasks = all.map(function(user){
      user.n = user.n || 1;
      return function(callback){
        console.log('Checking user ' + user.email + ' (' + user.n + ')'))
        checker(user.email, user.password, user.url).then(function(n){
          console.log('Have checked user ' + user.email);
          if(n > user.n){
            console.log('Sending mail and removing user ' + user.mail)
            mailer.send(user.email);
            users.remove({_id: user._id});
          }
          callback(null);
        }, function(){
          console.log('Error checking user ' + user.email);
          callback(null);
        });
      }
    });

    async.parallelLimit(tasks, concurrency, function(){
      console.log('Done!');
      process.exit(0);
    });
  });
};
