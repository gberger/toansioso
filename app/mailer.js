var Deferred = require('deferred');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "toansioso@gmail.com",
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = function(to) {
  var def = Deferred();

  var mailOptions = {
    from: "TOAnsioso <toansioso@gmail.com>",
    to: to,
    subject: "Seu TOA chegou!",
    html: '<b>Seu TOA chegou!</b> Acesse o <a href="https://mycusthelp.info/IIE/_cs/Login.aspx">portal do Grantee</a> para vê-lo. :)'
  }

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      def.reject(error);
    } else {
      def.resolve(response.message);
    }
  });

  return def.promise;
};
