//Async functions
var async = require('async');

//DB
var mongoose = require('mongoose');

//Genre
var Podcast = mongoose.model('Podcast');


exports.printPodcast = function (podcast, callback) {
    
    callback();
 
};

exports.printPodcasts = function (podcasts, callback) {
    
    async.each(podcasts,

        function(item, callback) {

            genres.printPodcast(item, function(){
        
                callback(null);
            });
        },

        function(error) {

            callback();
        }
    );        
};

exports.printAllPodcasts = function (callback) {
    
    callback();
};

exports.printAllGenres = function (callback) {
    
    listAllGenres(function(allGenres){
        
    });   
};


