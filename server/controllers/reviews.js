var express = require('express');
var router = express.Router();

var Review = require('../models/review');

router.post('/api/reviews', function(req,res, next){
    console.log("Creating reviews")
    var review = new Review(req.body);
    review.save(function(err, review){
        if (err) {return next(err);}
        res.status(201).json(review);
    });
});

// Get all reviews
router.get('/api/reviews', function (req, res, next) {
    Review.find(function (err, reviews) {
        if (err) { return next(err); }
        if (reviews === null) {
            return res.status(404).json({ 'message': 'Review not found!' });
        }
        console.log(reviews);
        res.status(201).json({ 'reviews': reviews });
    });
});

router.delete('/api/reviews/', function (req, res, next) {
    Review.deleteMany(function (err, reviews) {
        if (err) { return next(err); }
        if (reviews === null) {
            return res.status(404).json({ 'message': 'Reviews not found' });
        }
    });
    res.json({ 'message': 'Review Deleted' });
});

router.delete('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;

    Review.deleteMany({id}, function(err, reviews){
        if(err) {return next(err);}
        if(reviews === null) {
            return res.status(404).json({'message':'Review not found'});
        }
        res.json({'message':'Review Deleted'});
    });
});

router.patch('/api/reviews/:id', function(req, res, next) {
    Review.findOneAndUpdate(req.params.id, {text: req.body.text} ,{new: true}, function (err, review){
        if(err) {return next(err);}
        if(review === null) {
            return res.status(404).json({'message':'Review not found'});
        }
        console.log(review);
        res.json({'message':'Review update'});
    });
   });

module.exports = router;