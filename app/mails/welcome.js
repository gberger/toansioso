var mailer = require('../mailer');

module.exports = function(user) {
  var url = 'http://toansioso.herokuapp.com/unregister?token=' + user.token;
  return mailer({
    to: user.email,
    subject: 'Bem-vindo ao TOAnsioso',
    html: '<b>Olá!</b> Agora fique tranquilo que lhe enviaremos um email quando seu TOA chegar. <br>' +
          'Caso queira CANCELAR seu cadastro no TOAnsioso, clique em: <a href="'+url+'">'+url+'</a>. ' +
          'Isso não afeta sua inscrição no CSF.'
  })
};
