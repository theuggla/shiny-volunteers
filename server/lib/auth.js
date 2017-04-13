'use strict';

// Requires.
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let Volunteer = require('../models/Volunteer');
let jwt = require('jsonwebtoken');


/**
 * Local Passport-strategy.
 * Will add the user if it does not already exist.
 * Will connect the accounts if the user already has a Facebook-login.
 */
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password', session: false, passReqToCallback: true}, (req, email, password, done) => {
    Volunteer.findOne({'info.email': email.trim()}, (err, user) => {

        // Something went wrong.
        if (err) {
            return done(err);
        }

        // User exists with a local login.
        if (user && user.local.password) {
            user.comparePassword(password.trim())
                .then((isMatch) => {
                    if (!isMatch) {
                        let error = new Error('Incorrect password');
                        error.name = 'IncorrectCredentialsError';

                        return done(error);
                    }

                    return done(null, user);
                })
                .catch((error) => {
                    return done(error);
                });
        }

        // User exists with a Facebook login.
        if (user) {
            user.local.email = user.info.email;
            user.save()
                .then((savedUser) => {
                    return savedUser.hashPasswordAndSave(password);
                })
                .then((savedUser) => {
                    return done(null, savedUser);
                })
                .catch((error) => {
                    return done(error);
                });
        }

        // User does not exist.
        if (!user) {
            let newUser = new Volunteer({
                info  : {
                    email       : email.trim(),
                    roles       : ['volunteer']
                },
                local : {
                    email       : email.trim()
                },
                profile : {
                    isComplete  : false
                }
            });

            newUser.save()
                .then((savedUser) => {
                    return savedUser.hashPasswordAndSave(password);
                })
                .then((savedUser) => {
                    return done(null, savedUser);
                })
                .catch((error) => {
                    return done(error);
                });
        }

                    /*
                    let payload = {
                        sub: user.id
                    };

                    // Create a token string
                    let token = jwt.sign(payload, process.env.JWT_SECRET);
                    let data = {
                        email: user.email
                    };

                    return done(null, token, data);*/
    });
}));

/**
 * Facebook Passport-strategy.
 * Will add the user if it does not already exist.
 * Will connect the accounts if the user already has a Local-login.
 */
passport.use(new FacebookStrategy({clientID: process.env.FACEBOOK_ID, clientSecret: process.env.FACEBOOK_SECRET, callbackURL: process.env.SITE_URL + '/login/facebook/return', profileFields: ['id', 'displayName', 'email']},
    (accessToken, refreshToken, profile, done) => {

        // The Facebook-profile has an associated email-address.
        if (profile.emails) {
            Volunteer.findOne({'info.email': profile.emails[0].value}, (err, user) => {

                // Something went wrong.
                if (err) {
                    return done(err);
                }

                // The user already has a local login.
                if (user) {
                    user.facebook.id = profile.id;
                    user.facebook.email = user.info.email;
                    user.save()
                        .then(() => {
                            return done(null, user);
                        })
                        .catch((error) => {
                            return done(error);
                        });
                }
            });
        }

        // Facebook-profile does not have an associated email address.
        // Or user did not have a local login.
        Volunteer.findOne({'facebook.id': profile.id}, (err, user) => {

            // Something went wrong.
            if (err) {
                return done(err, false);
            }

            // The user already exists.
            if (user) {
                return done(null, user);
            }

            // The user did not exist.
            if (!user) {
                let newUser = new Volunteer({
                    info  : {
                        roles       : ['volunteer']
                    },
                    facebook : {
                        id       : profile.id
                    },
                    profile : {
                        isComplete  : false
                    }
                });

                if (profile.emails) {
                    user.info.email = profile.emails[0].value;
                    user.facebook.email = profile.emails[0].value;
                }

                newUser.save()
                    .then((savedUser) => {
                        return done(null, savedUser);
                    })
                    .catch((error) => {
                        return done(error);
                    });
            }
        });
            /*
            let payload = {
                sub: user.id
            };
            // Create a token string
            let token = jwt.sign(payload, process.env.JWT_SECRET);
            let data = {
                email: user.email
            };

            return done(null, token, data);*/
}));

// Put the user in the database.
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

// Retrieve the user from the database.
passport.deserializeUser((id, done) => {
    Volunteer.findById(id, (err, user) => {
        if (err) {
            return done(err);
        }

        return done(null, user);
    });
});
