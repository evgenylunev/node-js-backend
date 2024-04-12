const express = require("express");
const bodyParser = require("body-parser");
const logger       = require('morgan');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');

const app = express();
const routing    = require('./security/routing');
const CONFIG = require('./config/config');

app.use(logger(CONFIG.app));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

console.log("Environment:", CONFIG.app)

const models = require("./models/");

//databese connection
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
}).catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
});

// use cors
app.use(cors());

// basic routing
app.use('/ring', routing);

app.use('/', function(req, res){
	res.statusCode = 200;// send the appropriate status code
	res.json({status:"success", message:"Ring Central Call Service", data:{}})
});

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

// handling all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});
