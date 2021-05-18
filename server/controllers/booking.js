var express = require('express');
var router = express.Router();

var Booking = require('../models/booking');


/*
TODO: Add error response status code when trying to insert invalid type so it does not respond with "500" 
instead respond with a coresponding status code 
*/

//create a booking
router.post('/api/bookings/create', function (req, res, next) {
    try {
        var booking = new Booking(req.body);
        booking.save(function (err, booking) {
            res.status(201).json(booking);
        });
    } catch (e) {
        res.status(500).json({ 'message': "oops something whent wrong" })
    }
});

//get booking by flight ID
router.get('/api/bookings/get/flightID', function (req, res, next) {
    var flightID = req.body.flightID;
    Booking.find({ 'flightID': flightID }, function (err, booking) {
        if (err) { return next(err); }
        if (booking === null) {
            return res.status(404).json({ 'message': 'booking not found' });
        }
        res.json({ "bookings": booking });
    });
});

//get booking by _id
router.get('/api/bookings/get/bookingID', function (req, res, next) {
    var bookingID = req.body.id;
    Booking.find({ '_id': bookingID }, function (err, booking) {
        if (err) { return next(err); }
        if (booking === null) {
            return res.status(404).json({ 'message': 'booking not found' });
        }
        res.json({ "bookings": booking });
    });
});

//delete booking by ID
router.delete('/api/bookings/delete/deleteByID', function (req, res, next) {
    Booking.findByIdAndDelete(req.body._id, function (err, booking) {
        if (err) { return next(err); }
        if (booking === null) {
            return res.status(404).json({ 'message': 'booking not found' });
        }
        res.json({ 'message': 'Deleted!' });
    });
});

//get all bookings
router.get('/api/bookings/get', function (req, res, next) {
    Booking.find(function (err, bookings) {
        if (err) { return next(err); }
        res.json({ 'bookings': bookings });
    });
});


module.exports = router;
