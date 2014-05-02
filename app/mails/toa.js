var mailer = require('../mailer');

module.exports = function(to) {
  return mailer({
    to: to,
    from: process.env.MAIL_ACCOUNT || 'toansioso@gmail.com',
    subject: "Seu TOA chegou!",
    html: '<b>Seu TOA chegou!</b> Acesse o <a href="https://mycusthelp.info/IIE/_cs/Login.aspx">portal do Grantee</a> para vê-lo. :)'
  })
};
