//DB
var mongoose = require('mongoose');

//Genre Model
var Genre = mongoose.model('Genre');

exports.findOrCreateGenre = function (name, id, parent, callback) {
	
	Genre.findGenreWithName(name, function(genre) {
        if(!genre){
            genre = new Genre({
                name: name, 
                iTunesID: id,
                parent: parent,
                updatedAt: Date.now   
            });
        }
        
        callback(genre);    
	});
};









