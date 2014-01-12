//Async functions
var async = require('async');

//DB
var mongoose = require('mongoose');

//Genre
var Genre = mongoose.model('Genre');

var getiTunesIDWithWebURL = function (url, callback){
  
    
    
    
    
};


exports.findOrCreateGenre = function (name, id, url, callback) {

    Genre.findGenreWithName(name, function(error, genre){
            
        if(!genre){
                        
            genre = new Genre({
                name: name, 
                iTunesID: id,
                webURL: url,
                updatedAt: Date.now()   
            });
            genre.save();
    
        }else{
            
            genre.name = name;
            genre.iTunesID = id;
            genre.updatedAt = Date.now();
            genre.save();
            
        }
        callback(genre);    
        
    });
};

exports.addChildrenGenres = function (genre, childGenres, callback) {
    
    async.each(childGenres, function(item, callback){
        
        item.parent = genre;
        item.save();
        callback(null);

    }, function(err){

        callback();

    });            
    
};


exports.printGenre = function (genre, callback) {
    
    Genre.findSubGenresForGenre(genre, function(error, subGenres){
        
        console.log('---------------------------');
        
        console.log('genre: ' + genre.name);
        
        console.log('subgenres(' + subGenres.length + '): ');
        
        if(subGenres){
            subGenres.forEach(function (subGenre){
                
                console.log('----subGenre: ' + subGenre.name);
            });
        }
                        
        console.log('---------------------------');
        callback(null);

    });    
};








