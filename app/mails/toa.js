var mailer = require('../mailer');

module.exports = function(to) {
  return mailer({
    to: to,
    subject: "Seu TOA chegou!",
    html: '<b>Seu TOA chegou!</b> Acesse o <a href="https://mycusthelp.info/IIE/_cs/Login.aspx">portal do Grantee</a> para vê-lo. :)'
  })
};
