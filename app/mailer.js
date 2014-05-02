var Deferred = require('deferred');
var Sendgrid = require('sendgrid');

if(!process.env.SENDGRID_USERNAME || !process.env.SENDGRID_PASSWORD){
  console.error('NO SENDGRID CREDENTIALS!');
  process.exit(1);
}

var sendgrid = Sendgrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

module.exports = function(opts) {
  var def = Deferred();

  if(!opts.from) {
    opts.from = process.env.MAIL_ACCOUNT || 'toansioso@gmail.com';
  }

  sendgrid.send(opts, function(error, response){
    if(error){
      def.reject(error);
    } else {
      def.resolve(response);
    }
  });

  return def.promise;
};
