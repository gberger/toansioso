var Deferred = require('deferred');
var Browser = require('zombie');

module.exports = function(email, password, url) {
  var browser = new Browser();

  var def = Deferred();

  browser.visit(url).then(function(){
    if(browser.query('#txtPassword')){
      browser.fill('txtUsername', email);
      browser.fill('txtPassword', password);
      return browser.pressButton('Log In');  
    } 
  }).then(function(){
    if(browser.query('#header_errors li')){
      def.reject('WRONG_CREDENTIALS')
    } 

    var html = browser.html();
    var match = html.match(/Documents you have uploaded \((\d+)\)/);
    if(match === null || !match[1]) {
      def.reject('WRONG_URL')
    }

    var docs = parseInt(match[1], 10);
    def.resolve(docs);
  });

  return def.promise;
}