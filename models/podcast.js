var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Podcast = new Schema({
    name: {type: String, required: true},
    url: {type:String, required: false},
    iTunesID: {type:String, required: false},
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

exports.PodcastModel = mongoose.model('Podcast', Podcast);
