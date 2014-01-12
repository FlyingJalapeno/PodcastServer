//DB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var PodcastSchema = new Schema({
    name: {type: String, required: true},
    url: {type:String, required: false},
    iTunesID: {type:String, required: false},
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

PodcastSchema.static = {
    
    findPodcastWithiTunesID: function (id, callback) {

        this.findOne({iTunesID:id})
        .populate('genres')
        .exec(callback);
 
    }      
};

exports.PodcastModel = mongoose.model('Podcast', PodcastSchema);

console.log('Podcast Schema Loaded!');
