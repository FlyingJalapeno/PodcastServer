//File System
var fs = require('fs');

//DB
mongoose = require('mongoose');

//Web API
var express = require("express");

//Setup DB
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/podcastdatabase';
mongoose.connect(uristring, function (err, res) {
    if (err) {
         console.log('ERROR: ' + err);
    } else {
        console.log('Connected to database');
    }
});

//Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) 
    console.log(file + ' model file found');
    require(models_path + '/' + file);
});

//Setup server
var app = express();
require('./config/express')(app);

//Bootstrap routes
require('./config/routes')(app);

//REPL - console
//Access from the command line by: rc /tmp/repl/podcast-server.sock
var Genre = mongoose.model('Genre');
var replify = require('replify');
replify('podcast-server', app, [{'Genre':Genre}]);

//Start Server
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});