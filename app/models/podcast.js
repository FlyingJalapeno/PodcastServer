//DB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var PodcastSchema = new Schema({
    name: {type: String, required: true},
    rssURL: {type:String, required: false},
    iTunesID: {type:String, required: false},
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

PodcastSchema.static = {
    
    list: function (options, callback) {

        this.find()
          .sort('name') // sort by name
          // .limit(options.perPage)
          // .skip(options.perPage * options.page)
          .exec(callback); 
    },
    
    findPodcastWithiTunesID: function (id, callback) {

        this.findOne({iTunesID:id})
        .populate('genres')
        .exec(callback);
 
    }      
};

exports.PodcastModel = mongoose.model('Podcast', PodcastSchema);

console.log('Podcast Schema Loaded!');
