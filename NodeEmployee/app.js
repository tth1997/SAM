var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var cache = require('memory-cache');
var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 10/*seconds*/});

var objMasterNat = {};

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/shipping')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var index = require('./routes/index');
var users = require('./routes/users');
var employees = require('./routes/employees');
var jobs = require('./routes/jobs');
var jobassignments = require('./routes/jobassignments');
var clients = require('./routes/clients');
var vdranalysiss = require('./routes/vdranalysiss');
var observationanalysis = require('./routes/observationanalysis');

var fsr = require('fs'), objNat;

//Read File and send to the callback
fsr.readFile('./public/jsondata/nationality.json', handleFile);

//callback function
function handleFile(err, data) {
    if (err) throw err
    objNat = JSON.parse(data)
  
    objMasterNat["objNat"] = objNat;
  cache.put('objNat', objMasterNat);
  
}

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/dashboard',index);
app.use('/users', users);
app.use('/employees', employees);
app.use('/jobs',jobs);
app.use('/jobassignments',jobassignments);
app.use('/clients',clients);
app.use('/vdranalysiss',vdranalysiss);
app.use('/observationanalysis',observationanalysis);

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
