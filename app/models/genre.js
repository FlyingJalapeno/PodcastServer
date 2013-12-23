//DB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var GenreSchema = new Schema({
    name: {type: String, required: true},
    iTunesID: {type: String, required: false},
    parent: { type: Schema.Types.ObjectId, ref: 'Genre' },
	updatedAt: {type: Date, default: Date.now},
    parseID: {type: String, required: false},
    parseUpdatedAt: {type: Date, default: Date.now}
});

GenreSchema.static = {
    
    findGenreWithiTunesID: function (id, callback) {

        this.findOne({iTunesID:id})
        .populate('parent')
        .exec(callback);
 
    },
    
    findGenreWithName: function (name, callback) {

        this.findOne({name:name})
        .populate('parent')
        .exec(callback);
 
    }      
};

exports.GenreModel = mongoose.model('Genre', GenreSchema);

console.log('Genre Schema Loaded!');
