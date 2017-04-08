/**
 * Module to authenticate the user without
 * with the passport module
 * and save the user into the site's database.
 */

//Requires.
let passport = require('passport');
let jwt = require('jsonwebtoken');
let Strategy = require('passport-local').Strategy;
let Volunteer = require('../models/Volunteer');



/**
 * Initialize the authentication and set up the handling
 * against the database.
 */
function connect() {
    passport.use(
        new Strategy(
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

                            // create a token string
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
}

//Exports.
module.exports = {
    connect: connect
};
