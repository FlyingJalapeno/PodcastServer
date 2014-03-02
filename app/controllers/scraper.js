//Async functions
var async = require('async');

//HTTP Connections
var http = require('http');
var https = require('https');

//DOM
var cheerio = require('cheerio');

//Genres
var genres = require('./genres');

//Podcasts
var podcasts = require('./podcasts');


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
                
                genres.printAllGenres(function(){
            
                    callback(null, savedGenres);
            
                });                                     
            });
            
          }else{
              
              console.log('error scraping genres');  
              callback(null);
            
          } 
        });
        
};

//Scrape Podcasts
var scrapePopularPodcastsForGenre = function($, genre, callback) {
    

    callback();
    
};


var scrapePodcastsForGenre = function(genre, callback) {
    
    download(genre.url, function(data) {
        
        if (data) {
   
          var $ = cheerio.load(data);
          
          scrapePopularPodcastsForGenre($, genre, function(genrePodcasts){
              
              callback(genrePodcasts);
              
          });
          
      }else{
              
              console.log('error scraping podcasts');  
              callback(null);
            
          }
        
    });
    
};


var scrapePodcasts = function(callback) {
    
    var allPodcasts = [];
    
    genres.listAllGenres(function(allGenres){
        
        async.each(allGenres,
        
            function(item, callback) {
  
                scrapePodcastsForGenre(item, function(allPodcasts){
                    
                    allPodcasts.push(podcasts);
                    
                    podcasts.printPodcasts(scrapedPodcasts, function(){
                    
                        callback(null);                    
                    });
                    
                });
            },
        
            function(error) {
  
                callback(error, allPodcasts);
            }
        
        );    
        
    });    
};



//Scrape
exports.scrape = function(req, res){
                
    scrapeGenres(function(err, scrapedGenres) {

        scrapePodcasts(scrapedGenres, function(err, scrapedPodcasts){
                    
            console.log('Done!');
            res.send('success!' + scrapedGenres + scrapedPodcasts);
        
        });                                          
    });
};
