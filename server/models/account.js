var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    username: {type: String, require},
    name: {type: String, require},
    password: {type: String, require},
    email: {type: String, require},
    authorised: {type: Boolean}
});

module.exports = mongoose.model('accounts', accountSchema);