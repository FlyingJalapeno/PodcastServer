//Logging
var logfmt = require("logfmt");

//Web API
var express = require("express");

//HTTP Connections
var http = require("http");
var https = require('https');

//DOM
var cheerio = require("cheerio");

//Setup server
var app = express();
app.use(logfmt.requestLogger());
var port = process.env.PORT || 5000;

//Start Server
app.listen(port, function() {
  console.log("Listening on " + port);
});

//Download HTML
var download = function(url, callback) {
  https.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}


var scrapePodcasts = function(callback) {
    
    var url = "https://itunes.apple.com/us/genre/podcasts/id26?mt=2"

        download(url, function(data) {
          if (data) {
     
            var $ = cheerio.load(data);
            
           $('#main', 'body').children('#content').children('.padder').children('#genre-nav').children('.grid3-column').children().each(function(index, element) {
                

                $(element).children().each(function(index, element) {
                    
                    console.log($(element).children('a').attr('title'));
                    console.log($(element).children('a').attr('href'));

                    console.log("Sub Genres:");

                    $(element).children('ul').children().each(function(index, element) {
                       
                    console.log($(element).children('a').attr('title'));
                    console.log($(element).children('a').attr('href'));

                     console.log("-------------");

                        
                    });

                    console.log("----------------------------------");
                });
            });
            

    //        console.log("grid: " + $("grid3-column"));

            
    //	    $("ul > grid-3-column","genre-nav").each(function(index, element) {
    //	        
    //            $(element).children().each(function(index, element) {
    //            
    //                var genreUrl = $(element).attr("a");
    //                console.log("scraped genre url: " + genreURL);
    //                attributes.push(genreUrl);
    //            
    //            });
    //	      
    //            console.log("genre nav: " + element);
    //
    //        });


          }
          else console.log("error");  
        });
   
}

//API GET
app.get('/', function(req, res) {
	
//	res.send("collected genre urls: " + attributes.join(', '));
				
});


scrapePodcasts();
