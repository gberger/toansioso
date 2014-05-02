var Deferred = require('deferred');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = function(opts) {
  var def = Deferred();

  if(!opts.from) {
    opts.from = "TOAnsioso <" + process.env.MAIL_ACCOUNT + ">";
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
