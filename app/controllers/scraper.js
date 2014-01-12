//Async functions
var async = require('async');

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

//Save Genres to DB
var saveParentGenre = function(item, callback) {
    
    genres.findOrCreateGenre(item.title, '', item.url, function(genre){
                                                                          
        async.map(item.subGenres, 
            
            function(item, callback) {
  
                genres.findOrCreateGenre(item.title, '', item.url, function(genre){
                          
                    callback(null, genre);
        
                 });               
            }, 
            
            function(err, subGenres){
                        
                genres.addChildrenGenres(genre, subGenres, function(){
                    
                    callback(null, genre);    
                    
                });      
                
                      
            }
        );            
        
        
     });               
};

var saveGenres = function(genreData, callback) {
    
    async.map(genreData, saveParentGenre, function(err, results){

        callback(null, results);

    });            
};

//Scrape Genres
var scrapeGenres = function(callback) {
    
    var genreData = [];
    var url = 'https://itunes.apple.com/us/genre/podcasts/id26?mt=2';

        download(url, function(data) {
            
          if (data) {
     
            var $ = cheerio.load(data);
            
           $('#main', 'body').children('#content').children('.padder').children('#genre-nav').children('.grid3-column').children().each(function(index, element) {
                
                $(element).children().each(function(index, element) {
                                        
                    var title = $(element).children('a').attr('title');
                    var url = $(element).children('a').attr('href');
                              
                    var childGenreData = [];
                                                                            
                    $(element).children('ul').children().each(function(index, element) {
                       
                        var title = $(element).children('a').attr('title');
                        var url = $(element).children('a').attr('href');

                        childGenreData.push({title: title, url: url});                       
                        
                    });

                    genreData.push({title: title, url: url, subGenres: childGenreData});

                });
            });
            
            saveGenres(genreData, function (err, savedGenres) {
                
                callback(null, savedGenres);
                
            });
            
          }else{
              
              console.log('error');  
              callback('error', null);
            
          } 
        });
        
};

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


//Scrape Genres
exports.scrape = function(req, res){
        
    scrapeGenres(function(err, scrapedGenres) {
                
        console.log('Done!');
                                        
        async.each(scrapedGenres, 
        
            function(item, callback) {
  
                genres.printGenre(item, function(){
            
                    callback(null);
                });
            },
        
            function(err){
                    
                res.send('success!' + scrapedGenres);
                    
            }
        );                             
          
                
    });
    
};