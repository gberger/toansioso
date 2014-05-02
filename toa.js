var colors = require('colors')
var Browser = require('zombie');
var config = require('./config.json');

if(!config || !config.email || !config.password) {
  console.error("Put your email and password in JSON format in config.json!\nSee the README for more info.".red)
  process.exit(1);
}

var browser = new Browser();

console.log(('Visiting ' + config.url + '...').grey)

browser.visit(config.url).then(function(){
  if(browser.query('#txtPassword')){
    console.log('Logging in...'.grey);

    browser.fill('txtUsername', config.email);
    browser.fill('txtPassword', config.password);
    return browser.pressButton('Log In');  
  } 
}).then(function(){
  console.log('Logged in!'.grey);
  var html = browser.html();
  var docs = html.match(/Documents you have uploaded (\(\d+\))/)[1];
  if(docs === '(1)') {
    console.log(docs.blue);
  } else {
    console.log(docs.green);
  }
});
