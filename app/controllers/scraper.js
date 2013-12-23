//HTTP Connections
var http = require('http');
var https = require('https');

//DOM
var cheerio = require('cheerio');

//Genres
var genres = require('./genres');


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
};

exports.scrape = function(req, res){
    
    this.scrapeGenres({
        
        
        
        
    });
    
};

//Scrape Genres
var scrapeGenres = function(callback) {
    
    var url = 'https://itunes.apple.com/us/genre/podcasts/id26?mt=2';

        download(url, function(data) {
          if (data) {
     
            var $ = cheerio.load(data);
            
           $('#main', 'body').children('#content').children('.padder').children('#genre-nav').children('.grid3-column').children().each(function(index, element) {
                
                $(element).children().each(function(index, element) {
                                        
                    var title = $(element).children('a').attr('title');
                    var url = $(element).children('a').attr('href');
                    
                    genres.findOrCreateGenre(title, '', url, function(genre){
                                                
                        console.log(genre.title);
                        console.log(genre.url);
                        
                    });
                    

                    console.log('Sub Genres:');

                    $(element).children('ul').children().each(function(index, element) {
                       
                        var title = $(element).children('a').attr('title');
                        var url = $(element).children('a').attr('href');


                        genres.findOrCreateGenre(title, '', url, function(genre){
                        
                            console.log(genre.title);
                            console.log(genre.url);
                        
                            console.log('-------------');
                        
                        });
                       
                        
                    });

                    console.log('----------------------------------');
                });
            });
            

   // console.log("grid: " + $("grid3-column"));
// 
//     
//  $("ul > grid-3-column","genre-nav").each(function(index, element) {
//         
//        $(element).children().each(function(index, element) {
//        
//            var genreUrl = $(element).attr("a");
//            console.log("scraped genre url: " + genreURL);
//            attributes.push(genreUrl);
//        
//        });
//       
//        console.log("genre nav: " + element);
// 
//    });


          }
          else console.log('error');  
        });
   
};


//Scrape Podcasts
var scrapePodcasts = function(callback) {
    
    
    
};
