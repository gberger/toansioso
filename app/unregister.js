var checker = require('./checker');

module.exports = function(req, res) {
  var token = req.query.token;

  var users = req.db.get('users');

  users.remove({token: token}, function(err, col){
    if(err) {
      res.send(500, 'Erro: ' + err);
    } else {
      res.send(200, 'Email descadastrado com sucesso.');
    }
  });
};
