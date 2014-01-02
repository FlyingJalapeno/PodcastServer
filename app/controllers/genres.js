//DB
var mongoose = require('mongoose');

exports.findOrCreateGenre = function (name, id, parent, callback) {
	
    //Genre Model
    var Genre = mongoose.model('Genre');
        
    Genre.findGenreWithiTunesID(id, function(error, genre){
            
        if(!genre){
            
            genre = new Genre({
                name: name, 
                iTunesID: id,
                parent: parent,
                updatedAt: Date.now   
            });
            
            // genre.save();
            // console.log('new genre: ' + genre);      
    
        }
    
        // console.log('genre: ' + genre);        
        callback(genre);    
        
    });
};







