//Web API
var express = require("express");

//Logging
var logfmt = require("logfmt");

module.exports = function (app) {
    
    app.set('showStackError', true);
    app.use(express.favicon());
    
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
      app.use(logfmt.requestLogger());
    }
  
    // don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
      app.use(express.logger('dev'));
    }
    
    // routes should be at the last
    app.use(app.router);
        
};
