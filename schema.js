var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Podcast = new Schema({
    name: {type: String, required: true},
    url: {type:String, required: false},
    parent: [Podcast],
    children : [{ type: Schema.Types.ObjectId, ref: 'Podcast' }]
});


var SKU = new Schema({
    sku: {type: String, required: true},
    description: {type:String, required: false},
    quantity: {type: String, required: true},
    imageURL: {type: String, required:false}
});
var Carton = new Schema({
    cartonNumber: {type: String, required: true},
    storeNumber: {type: String, required: true},
    skus: [SKU]
});
var Transfer = new Schema({
    transferNumber: {type: String, required: true},
    storeNumber: {type: String, required: true},
    skus: [SKU]
});
var Store = new Schema({
    storeNumber: {type: String, required:true},
    brand: {type: Number, required:true},
    IPaddress: {type: String, required: true}
});
var Acknowledgement = new Schema({
    acknowledgementNumber: {type: String, required:true},
    type: {type: Number, required:true},
    store: [Store],
    transfer: [Transfer],
    carton: [Carton]
});
var ErrorMessage = new Schema({
    errorMessage: {type: String, required: true}
});
exports.CartonModel = mongoose.model('Carton', Carton);
exports.TransferModel = mongoose.model('Transfer', Transfer);
exports.SKUModel = mongoose.model('SKU', SKU);
exports.StoreModel = mongoose.model('Store', Store);
exports.AcknowledgementModel = mongoose.model('Acknowledgement', Acknowledgement);
exports.ErrorMessageModel = mongoose.model('ErrorMessage', ErrorMessage);