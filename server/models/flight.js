var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flightSchema = new Schema({
    flight_number: {type: Number,required: true },
    departure: {type: String,required: true },
    airport: {type: String, required: true },
    departure_time: {type: Date,required: true  },
    destination: {type: String,required: true }
});

module.exports = mongoose.model('flights', flightSchema);