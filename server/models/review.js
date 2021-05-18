var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    account: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    username: {type: String, maxlength: 250, required: true},
    text: {type: String, maxlength: 250, required: true},
    date_posted: {type: Date, default: Date.now},
    rating: {type: Number}
}); 
module.exports = mongoose.model('reviews', reviewSchema); 