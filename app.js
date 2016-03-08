require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Q = require('q');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var fs = require('fs');
var easyimg = require('easyimage');
var request = require('request');

config = require("./config");
var mysql = require('mysql');
db = config.database;
var connection = mysql.createConnection({
  user:process.env.DB_USER,
  database:process.env.DB_DATABASE,
  password:process.env.DB_PASS,
  host:process.env.DB_HOST
});

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login/index');
var createAccount = require('./routes/login/createAccount');
var logout = require('./routes/logout');
var upload = require('./routes/upload');
var file = require('./routes/file');

var app = express();

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    store: new FileStore,
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);
app.use(function(req,res,next) {
  req.bcrypt = bcrypt;
  req.salt = bcrypt.genSaltSync(10);
  next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req,res,next) {
  req.crypto = crypto;
  req.multer = multer;
  req.upload = upload;
  req.fs = fs;
  req.easyimg = easyimg;
  req.request = request;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
    req.connection = connection;
    next();
});
app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/login/createAccount', createAccount)
app.use('/login/:user_id', login);
app.use('/logout', logout);
app.use('/upload', upload);
app.use('/file', file);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
