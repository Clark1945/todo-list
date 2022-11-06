var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var myrouter = require('./routes/myroute')
var api = require('./routes/api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// logger.format('test',':method :url :status :response-time')
// app.use(logger('test'));

app.use(logger('dev')); //logger工具
app.use(express.json()); //使可以解析json
app.use(express.urlencoded({ extended: false })); //使可以解析urlencoded
app.use(cookieParser()); //處理Cookie
app.use(express.static(path.join(__dirname, 'public'))); //讓網頁可以訪問該資料夾下的靜態檔案

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',api);
app.use('/my',myrouter); //為路徑參數 需再加上路由路徑才能使用
app.use('/public',express.static('public')); //將目錄對外開放，讓程式可以存取CSS,JAVASCRIPT,IMG

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
