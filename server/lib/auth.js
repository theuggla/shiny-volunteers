'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let Volunteer = require('../models/Volunteer');
let jwt = require('jsonwebtoken');


passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password', session: false, passReqToCallback: true}, (req, email, password, done) => {
    Volunteer.findOne({'info.email': email.trim()}, (err, user) => {
        // Something went wrong.
        if (err) {
            return done(err);
        }

        if (user && user.local.password) { // User exists.
            user.comparePassword(password.trim())
                .then((isMatch) => {
                    if (!isMatch) {
                        let error = new Error('Incorrect password');
                        error.name = 'IncorrectCredentialsError';

                        return done(error);
                    }

                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        } else if (user) { //User already has Facebook login.
            console.log('User already has facebook login.');
            user.local.email = user.info.email;
            user.save()
                .then((savedUser) => {
                    console.log('user saved! ' + savedUser.info.email);

                    return user.hashPasswordAndSave(password);
                })
                .then((user) => {
                    return done(null, user);
                })
                .catch((error) => {
                    return done(error);
                });
        } else { // User does not exist.
            console.log('user wasnt found. creating user.');
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
                    console.log('user saved! ' + savedUser.info.email);

                    return savedUser.hashPasswordAndSave(password);
                })
                .then((user) => {
                    console.log('password is saved');
                })
                .then((user) => {
                    return done(null, user);
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


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.SITE_URL + '/login/facebook/return',
    profileFields: ['id', 'displayName', 'email']},

    (accessToken, refreshToken, profile, done) => {
        if (profile.emails) {
            Volunteer.findOne({'info.email': profile.emails[0].value}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (user) {
                    console.log('user have local login');
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
        } else {
            Volunteer.findOrCreate({'facebook.id': profile.id}, (err, user, created) => {
                if (err) {
                    return done(err, false);
                }

                if (created) {
                    if (profile.emails) {
                        user.info.email = profile.emails[0].value;
                        user.facebook.email = profile.emails[0].value;
                    }

                    user.info.roles.push('volunteer');
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
