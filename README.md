TOA Checker
===========

This project checks for your TOA in the Brazilian Scientific Mobility Program website.

You can use it as a base for sending an email or another form of notification to yourself in case your TOA arrives.

Usage
-----

Step 1 - Install [Node.js](http://nodejs.org/) if you don't have it.

Step 2 - Clone the repository (or [download](https://github.com/gberger/toa/archive/master.zip) it).

Step 3 - Open a terminal (command prompt) and navigate to where the project is.

Step 4 - Install the dependencies:

```
npm install
```

Step 5 - Go to the [Grantee website](https://mycusthelp.info/IIE/_cs/Login.aspx), login, navigate to the TOA page and **copy the address**. It will be something similar to (but different from) `https://mycusthelp.info/IIE/_cs/CODetails.aspx?sSessionID=blablabla&ot=2&fid=5&oi=123456`

Step 6 - Create a file called `config.json` in the same folder and put this in it, making sure to substitute for your own info. Use the URL you got in the previous step.

```
{
  "url": "PREVIOUS URL GOES HERE",
  "email": "your@email.com",
  "password": "YourPasswordHere"
}
```

Step 7 - Run the script:

```
node toa.js
```
