'use strict';
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
var configAuth = require('./auth');

module.exports = (passport) => {
    //serialize the user for the session
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    //deserialize the user
    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            cb(err, user);
        })
    });
    var fbStrategy = configAuth.facebookAuth;
    passport.use(new FacebookStrategy(fbStrategy,
    (req, accessToken, refreshToken, profile, cb) => {
        process.nextTick(() => {
            //check if there is a user is already logged in, in case we have local login or google login or ...
            if (!req.user) {
                console.log('check 1');
                User.findOne({'facebook.id': profile.id}, (err, user) => {
                    if (err) return done(err);
                    if (user) {
                        console.log('check 2');
                        //if there is an user id without token (user used to login by facbook and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = accessToken;
                            user.facebook.name = profile._json.name;
                            user.facebook.email = profile._json.email;
                        }
                        user.facebook.point = user.facebook.point - 1;
                        user.save((err) => {
                            if (err) return cb(err);
                            return cb(null, user);
                        });
                    } else {
                        // if there is no user, create a new user
                        console.log('check 3');
                        var newUser = new User();
                        newUser.facebook.id = profile._json.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile._json.name;
                        newUser.facebook.email = profile._json.email;
                        newUser.facebook.point = 10000;

                        newUser.save((err) => {
                            if (err) return cb(err);
                            return cb(null, newUser);
                        });
                    }
                });
            } else {
                console.log('check 4');
                // user already exists and is logged in, so we link accounts
                var user = req.user;

                user.facebook.id = profile._json.id;
                user.facebook.token = accessToken;
                user.facebook.name = profile._json.name;
                user.facebook.email = profile._json.email;

                user.save((err) => {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }
        });
    }));
}

