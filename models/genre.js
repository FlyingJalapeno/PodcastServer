var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Genre = new Schema({
    name: {type: String, required: true},
    iTunesID: {type:String, required: false},
    parent: { type: Schema.Types.ObjectId, ref: 'Genre' },
});

exports.GenreModel = mongoose.model('Genre', Genre);
