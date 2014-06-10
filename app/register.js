var mailer = require('./mailer');
var checker = require('./checker');

module.exports = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var url = req.body.url;
  var n = parseInt(req.body.n, 10);

  if(isNaN(n) || n === null || n === undefined){
    n = 1;
  }

  var users = req.db.get('users');

  users.find({email: email}, function(err, docs){
    if(docs.length > 0){
      res.json(400, {error: 'DUPLICATE'});
    } else {
      checker(email, password, url).then(function(docs){
        // success
        var token = require('crypto').randomBytes(16).toString('hex');
        
        var promise = users.insert({
          email: email, 
          password: password, 
          n: n,
          url: url, 
          done: false, 
          last: new Date(), 
          token: token
        });
        
        promise.error(function(err){
          res.json(500, {error: 'DB_ERROR.'});
        });
        
        promise.success(function(doc){
          res.json(200, {docs: docs});
          var url = process.env.URL + 'unregister?token=' + token;
          mailer({
            to: email,
            subject: 'Bem-vindo ao TOAnsioso',
            html: '<b>Olá!</b> Agora fique tranquilo que lhe enviaremos um email quando seu TOA chegar. <br>' +
                  'Caso queira CANCELAR seu cadastro no TOAnsioso, clique em: <a href="'+url+'">'+url+'</a>. ' +
                  'Isso não afeta sua inscrição no CSF.'
          });
        });
      }, function(reason){
        //error
        res.json(400, {error: reason});
      })
    }
  })



}