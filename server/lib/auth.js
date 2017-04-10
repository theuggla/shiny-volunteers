'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let Volunteer = require('../models/Volunteer');
let jwt = require('jsonwebtoken');


passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.SITE_URL + '/login/facebook/return'
    },

    (accessToken, refreshToken, profile, done) => { //kommer inte hitta den under facebookid pga har bytt namn på facebookid
        Volunteer.findOrCreate({facebookid: profile.id}, (err, user, created) => {
            if (err) return done(err, false);

            if (created)
            {
                if (profile.email)
                {
                    user.email = profile.email;
                }
                user.roles.push('volunteer');
                user.save();
            } else {
                let payload = {
                    sub: user.id
                };

                // Create a token string
                let token = jwt.sign(payload, process.env.JWT_SECRET);
                let data = {
                    email: user.email
                };

                return done(null, token, data);
            }
        });
    }));

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
            passReqToCallback: true
        },
        (req, email, password, cb) => {
            Volunteer.findOrCreate({email: email.trim()}, (err, user, created) => {
                if (err) { return cb(err); }

                if (!user) { return cb(null, false); }

                if (created) {
                    user.id = user._id;
                    user.roles.push('volunteer');
                    user.hashPasswordAndSave(password.trim());
                } else {
                    user.comparePassword(password.trim())
                        .then((isMatch) => {
                            if (!isMatch) {
                                const error = new Error('Incorrect password');
                                error.name = 'IncorrectCredentialsError';

                                return cb(error);
                            }

                            let payload = {
                                sub: user.id
                            };

                            // Create a token string
                            let token = jwt.sign(payload, process.env.JWT_SECRET);
                            let data = {
                                email: user.email
                            };

                            return cb(null, token, data);
                        })
                        .catch((error) => {
                            return cb(error);
                        });

                }
            });
        }));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    Volunteer.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

