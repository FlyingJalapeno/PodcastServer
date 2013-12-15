var express = require("express");
var logfmt = require("logfmt");
var nodeio = require("node.io");
var app = express();

app.use(logfmt.requestLogger());

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

var stories = [];

nodeio.scrape(function() {
    this.getHtml('http://www.reddit.com/', function(err, $) {
        $('a.title').each(function(title) {
            stories.push(title.text);
        });
        this.emit(stories);
    });
});


app.get('/', function(req, res) {
  res.send('Hello World! - here are reddit stories: ' stories);
});
