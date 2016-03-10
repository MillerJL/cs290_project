var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var chatbot = require('./chatbot');
var port = process.env.PORT || 7000;

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test post route
app.post('/chat', chatbot);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Chat Slack bot listening on port ' + port);
});
