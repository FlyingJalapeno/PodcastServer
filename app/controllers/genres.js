//Async functions
var async = require('async');

//DB
var mongoose = require('mongoose');

exports.findOrCreateGenre = function (name, id, url, callback) {
	
    //Genre Model
    var Genre = mongoose.model('Genre');
        
    Genre.findGenreWithiTunesID(id, function(error, genre){
            
        if(!genre){
            
            var theDate = Date.now();
            //console.log(theDate);
            
            genre = new Genre({
                name: name, 
                iTunesID: id,
                updatedAt: theDate   
            });
            
            genre.save();
            //console.log('new genre: ' + genre);      
    
        }else{
            
            //console.log('found genre: ' + genre);        
            
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








