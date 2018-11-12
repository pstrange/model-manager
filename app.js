var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

process.env.CLOUDINARY_URL = process.env.CLOUDINARY_URL || 'cloudinary://335631862727342:VzgjpuJjaiHvuzePnCA2faCaYHc@hbru3lefw';

var indexRouter = require('./routes/index');
var modelsRouter = require('./routes/models');
var layoutRouter = require('./routes/layouts');
var picRouter = require('./routes/pictures');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time, content-type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/models', modelsRouter);
app.use('/layouts', layoutRouter);
app.use('/succespictures', picRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
