var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    costumerID: { type: String, },
    price: { type: Number, required: true },
    seatNum: { type: Number },
    date: { type: Date, default: Date.now },
    flightID: { type: String },
    passangerName: { type: String }
});


module.exports = mongoose.model('bookings', bookingSchema);
