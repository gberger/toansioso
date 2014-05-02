TOA Checker
===========

Checks for your TOA in the Brazilian Scientific Mobility Program website.

http://toansioso.herokuapp.com/


Deploy
------

This is a guide to deploying this app on Heroku.

Clone or [download and extract](https://github.com/gberger/toansioso/archive/master.zip) this project.

Go to https://www.heroku.com/ and register for a free account. Then, download and install the [Heroku Toolbelt](https://toolbelt.heroku.com/).

Open a terminal (or command prompt) and navigate to the project folder. 

Run `heroku login` and login to your Heroku account.

Run `heroku create NAME` to create a new Heroku app using this project. NAME can be whatever you want (as long as it's available).

Add the Mongolab addon to your app: `heroku addons:add mongolab`

Add the Heroku Scheduler addon to your app: `heroku addons:add scheduler`

Use `heroku config:set KEY=VALUE` to set the following configurations:

 * `URL`: the URL the app will run on. Usually, http://NAME.herokuapp.com/. Please include the trailing '/'.
 * `MAIL_ACCOUNT`: the GMAIL account that will SEND emails to subscribers (example: toansioso@gmail.com). It MUST be a Gmail account.
 * `MAIL_PASSWORD`: the password of this account (example: pass1234)

For example, you'd need to run `heroku config:set MAIL_ACCOUNT=myemail@gmail.com`.

Now, run `heroku addons:open scheduler`, which will take you to your browser on the Scheduler dashboard. There, "Add Job". For the task name, use 'worker'. Keep the dyno size at 1X and set the frequency you'd like to run the TOA checking. Save it.

Finally, `git push heroku master` to deploy the app!

Open your app with `heroku open` to see if it worked. If something went wrong, you can use `heroku logs` to debug it.
