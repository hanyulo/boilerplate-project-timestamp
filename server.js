// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const { params } = req;
  const { date_string } = params;

  const getResult = (unix, utc) => {
    return Object.freeze({
      unix,
      utc,
    })
  }
  const getValidString = (ds) => {
    let regExp = /\d\d\d\d-(0[1-9])|(1[0-2])-\d\d/;
    if (regExp.test(ds)) {
      return ds;
    }
    return +ds;
  }
  try {
    const dateString = getValidString(date_string)
    if (!date_string) {
      const theDate = new Date();
      res.json(getResult(theDate.getTime(), theDate.toUTCString()))
      return
    }
    console.log('test')
    const theDate = new Date(dateString)
    res.json(getResult(theDate.getTime(), theDate.toUTCString()))
  } catch(e) {
    console.log(e);
    res.json({
      error: 'Invalid Date',
    });
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
