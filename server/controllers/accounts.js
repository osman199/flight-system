var express = require('express');
const { post } = require('../app');
//const account = require('../models/account');
var router = express.Router();
var rug = require('random-username-generator');
var Account = require('../models/account');
var Review = require('../models/review');
const { param } = require('./reviews');
const jwt = require("jsonwebtoken");
TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');
var auth_account = null;

// Creating accounts
router.post('/api/accounts', function (req, res, next) {
    var userEmail = req.body.email;
    Account.findOne({ email: userEmail }, function (err, accountFound) {
        if (err) { return next(err); }
        if (accountFound === null) {
            var account = new Account(req.body);
            account.username = rug.generate();
            account.save(function (err, account) {
                if (err) { return next(err); }
                res.status(201).json(account);
            });
        } else {
            res.status(201).json({ accountExists: true });
        }
    });
});

// Authenticating Accounts
router.post('/api/accounts/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    Account.findOne({ email: email }, function (err, accountFound) {
        if (err) { return next(err); }
        if (accountFound === null) {
            return res.status(404).json({message: 'Account not found'});
        }
        if (password === accountFound.password) {
            auth_account = accountFound;
            jwt.sign({accountFound}, 'secretkey', (err, token) => {
                res.json({
                    token, account: accountFound
                });
            });
        } else {
            res.json({message: 'Incorrect Password'})
        }
    });
});

router.get('/api/accounts/auth/me',verifyToken, function(req, res, next){
    res.json(auth_account)
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
         const bearer = bearerHeader.split(' ');
         const bearerToken = bearer[1];
         req.token = bearerToken;
         next();
    } else {
        res.sendStatus(403);
    }
}

router.post('/api/accounts/logout', function (req, res, next) {
    res.json({message: 'Log Out'});
});

// posting reviews
router.post('/api/accounts/:id/reviews', verifyToken, function (req, res, next) {
    console.log(req.body)
    jwt.verify(req.body.token, 'secretkey', (err, aData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Account.findById(req.params.id, function (err, account) {
                if (err) { return next(err); }
                if (account === null) {
                    return res.status(404).json({ 'message': 'Account not found!' });
                }
                var review = new Review({
                    account: req.params.id,
                    username: account.username,
                    text: req.body.text,
                    rating: req.body.rating
                });
                console.log(review);
                review.save(function(err, review){
                    if (err) {return next(err);}
                    res.status(201).json({review,aData});
                });
            });
        }
    })
});

// getting reviews commented by an account
router.get('/api/accounts/:id/reviews', function(req, res, next) {
    console.log(req.params)
    var id = req.params.id;
    var reviewByAccount = [];
    Review.find(function (err, reviews) {
        if (err) { return next(err); }
        if (reviews === null) {
            return res.status(404).json({ 'message': 'Review not found!' });
        }
        var i = reviews.length-1;
        while(i > 0){
            //console.log(reviews[i-1].account);
            console.log(req.params.id);
            if(reviews[i].account == req.params.id){
                //console.log(reviews[i]);
                reviewByAccount.push(reviews[i]);
            }
            i--;
        }
        console.log(reviewByAccount);
        res.status(201).json({ 'reviews': reviewByAccount });
    });
});

router.get('/api/accounts/:account_id/reviews/:review_id', function(req, res, next) {
    var accountID = req.params.account_id;
    var reviewID = req.params.review_id;
    var review = {};
    Review.find(function (err, reviews) {
        if (err) { return next(err); }
        if (reviews === null) {
            return res.status(404).json({ 'message': 'Reviews not found!' });
        }
        var i = reviews.length-1;
        while(i > 0){
            if((reviews[i].account == accountID)&&(reviews[i]._id == reviewID)){
                review = reviews[i];
            }
            i--;
        }
        res.status(201).json(review);
    });
});

router.delete('/api/accounts/:account_id/reviews/:review_id', function(req, res, next) {
    var accountID = req.params.account_id;
    var reviewID = req.params.review_id;
    Review.deleteOne({_id: reviewID, account: accountID}, function(err, reviews){
        if(err) {return next(err);}
        if(reviews === null) {
            return res.status(404).json({'message':'Review not found'});
        }
        res.json({'message':'Review Deleted'});
    });
});

router.delete('/api/accounts/', function (req, res, next) {
    Account.deleteMany(function (err, accounts) {
        if (err) { return next(err); }
        if (accounts === null) {
            return res.status(404).json({ 'message': 'Accounts not found' });
        }
    });
    res.json({ 'message': 'Account Deleted' });
});

//Deleting specific account
router.delete('/api/accounts/:id', function (req, res, next) {
    var id = req.params.id;
    Account.findByIdAndDelete(id, function (err, account) {
        if (err) { return next(err); }
        if (account === null) {
            return res.status(404).json({ 'message': 'Account not found' });
        }
    });
    res.json({ 'message': 'Account Deleted' });
});

// return all the accounts
router.get('/api/accounts', function (req, res, next) {
    Account.find(function (err, accounts) {
        if (err) { return next(err); }
        if (accounts === null) {
            return res.status(404).json({ 'message': 'Account not found!' });
        }
        res.json({ 'accounts': accounts });
    });
});

// Getting a specefic account
router.get('/api/accounts/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    Account.findById(id, function (err, account) {
        if (err) { return next(err); }
        if (account === null) {
            return res.status(404).json({ 'message': 'Account not found!' });
        }
        res.status(201).json(account);
    });
});

// Updating a certain info
router.put('/api/accounts/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(req.body);
    Account.findOneAndUpdate(id,{new: true}, function (err, account) {
        if (err) { return next(err); }
        if (account === null) {
            return res.status(404).json({ 'message': 'Account not found!' });
        }
        console.log(account);
        console.log(req.body.password + ' ' + account.password);
        if(req.body.password === account.password) {
            account.password = req.body.newPassword
            account.save(function(err, account) {
                if(err) {return next(err);}
                else {
                    console.log(account)
                    res.send({message: "password updated successfully!"});
                }
            });
        } else {
            res.send({message: 'Incorrect Password'})
        }
    });
});

module.exports = router;