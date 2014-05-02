var Deferred = require('deferred');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "toansioso@gmail.com",
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = function(opts) {
  var def = Deferred();

  if(!opts.from) {
    opts.from = "TOAnsioso <toansioso@gmail.com>";
  }

  smtpTransport.sendMail(opts, function(error, response){
    if(error){
      def.reject(error);
    } else {
      def.resolve(response.message);
    }
  });

  return def.promise;
};
