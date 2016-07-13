var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport'),
    evh = require('express-vhost');

var appFactory = function(echo) {
  var appInstance = express();

  if (process.env.NODE_ENV === 'development') {
    appInstance.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    appInstance.use(compress());
  }
  appInstance.use(bodyParser.urlencoded({
    extended: true
  }));
  appInstance.use(bodyParser.json());
  appInstance.use(methodOverride());
  appInstance.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  appInstance.use(flash());
  appInstance.use(passport.initialize());
  appInstance.use(passport.session());

  require('../app/routes/account.server.routes.js')(appInstance);

  return appInstance;
}

module.exports = function() {
  var app = express();

  app.use(evh.vhost(app.enabled('trust proxy')));

  evh.register('api.sso.dev', appFactory());

  return app;
}
