var colors = require('colors')
var Browser = require('zombie');

try {
  var config = require('./config.json');
} catch(err) {
  console.error("Couldn't load config.json. Does is it exist and is in the correct format?\nSee the README for more info.".red)
  process.exit(1);
}

if(!config || !config.email || !config.password || !config.url) {
  console.error("Put your email and password in JSON format in config.json!\nSee the README for more info.".red)
  process.exit(2);
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
  if(browser.query('#header_errors li')){
    console.log('Wrong username or password!'.red)
    process.exit(3);
  } 

  console.log('Logged in!'.grey);

  var html = browser.html();
  var match = html.match(/Documents you have uploaded (\(\d+\))/);
  if(match === null || !match[1]) {
    console.log("Couldn't find the number of uploaded documents! Are you sure the URL is correct?\nSee the README for more info.".red)
    process.exit(4);
  }

  docs = match[1];

  if(docs === '(1)') {
    console.log(docs.blue);
  } else {
    console.log(docs.green);
  }

  process.exit(0);
});
