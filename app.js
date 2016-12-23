var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
 passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');



var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//public folder
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
	secret:'secret',
	saveUninitialized: true,
	resave:true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());



//view routes
app.use('/', index);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
