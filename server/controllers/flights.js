var express = require('express');
var router = express.Router();
const { post } = require('../app');
var Flight = require('../models/flight');


//flight creating
router.post('/api/flights', function (req, res, next) {
    var number = req.body.flight_number;
    console.log(req.body);
    console.log(number);
    Flight.findOne({ flight_number: number }, function (err, flightFound) {
        if (err) { return next(err); }
        if (flightFound === null) {
            var flight = new Flight(req.body);
            flight.save(function (err, flight) {
                if (err) { return next(err); }
                res.status(201).json(flight);
            });
        } else {
            res.status(201).json({ FlightExist: true });
        }
    })
});

//get the available flights
router.get('/api/flights', function (req, res, next) {
    Flight.find(function (err, flights) {
        if (err) { return next(err); }
        res.json({ 'flights': flights });
    })
});

router.get('/api/flights/search', function (req, res, next) {
    var searched = []
    var departure = req.body.departure
    var destination = req.body.destination

    Flight.find(function (err, flights) {
        if (err) { return next(err); }
        flights.forEach(flight => {
            console.log(flight.destination +' '+ destination + ' '+ (flight.destination == destination));
            console.log(flight.departure +' '+ departure + ' ' + (flight.departure == departure));
            if ((flight.destination == destination) && (flight.departure == departure)) {
                searched.push(flight)
            }
            console.log(flight);
          });
          console.log(searched)
        res.json({ searched });
    })
});

// find single flight
router.get('/api/flights/:id', function(req,res,next){
    var id=req.params.id;
    flight.findById(id, function(err,flight){
        if(err){return next(err);}
        if(flight==null){
            return res.status(404).json({'message':'flight not found'});
        }
        res.json(flight);
    });
 });
 //delete a flight by ID
router.delete('/api/flights/:id', function (req, res, next) {
    var id = req.params.id;
    Flight.findByIdAndDelete(id, function (err, flight) {
        if (err) { return next(err); }
        if (flight === null) {
            return res.status(404).json({ 'message': 'flight not found' });
        }
        res.json({ 'message': ' The flight is deleted!' });
    });
});
router.delete('/api/flights/', function (req, res, next) {
    Flight.deleteMany(function (err, flights) {
        if (err) { return next(err); }
        if (flights === null) {
            return res.status(404).json({ 'message': 'flights not found' });
        }
    });
    res.json({ 'message': 'flights are  Deleted' });
});

 // Updating some information
 router.put('/api/flights/:id', function (req, res, next) {
    console.log("Updating the flight");
    var id = req.params.id;
    Flight.findOneAndUpdate(id, req.body,{new: true}, function (err, flight) {
        if (err) { return next(err); }
        if (flight === null) {
            return res.status(404).json({ 'message': 'flight not found!' });
        }
        res.status(201).json(flight);
    });
});

router.patch('/api/flights/:id', function(req, res, next) {
    Flight.findOneAndUpdate(req.params.id, {destination: req.body.destination} ,{new: true}, function (err, flight){
        if(err) {return next(err);}
        if(flight === null) {
            return res.status(404).json({'message':'Flight not found'});
        }
        res.status(201).json(flight);
    });
});

module.exports = router;