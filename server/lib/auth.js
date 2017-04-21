'use strict';

// Requires.
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let Volunteer = require('../models/Volunteer');
let Organization = require('../models/Organization');
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

        // Check if user is already registred as an organization
        Organization.findOne({'info.email': email.trim()}, (err, orgUser) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                user = orgUser;
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

                        return done(null, getJWT(user), user.info);
                    })
                    .catch((error) => {
                        return done(error);
                    });
            }

            // User exists with a Facebook login.
            if (user) {
                // User has a volunteer Facebook-login and tries to sign up as an Organization.
                if (req.body.role === 'organization') {
                    let error = new Error('Cannot use the same email-address as an organization and a volunteer. Please sign up with another email.');
                    error.name = 'AccountMismatchError';

                    return done(error);
                }

                user.local.email = user.info.email;
                user.save()
                    .then((savedUser) => {
                        return savedUser.hashPasswordAndSave(password);
                    })
                    .then((savedUser) => {
                        return done(null, getJWT(savedUser), savedUser.info);
                    })
                    .catch((error) => {
                        return done(error);
                    });
            }

            // User does not exist.
            if (!user) {
                let newUser;

                if (req.body.role === 'volunteer') {
                    newUser = new Volunteer({
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
                } else {
                    newUser = new Organization({
                        info  : {
                            email       : email.trim(),
                            roles       : ['organization']
                        },
                        local : {
                            email       : email.trim()
                        }
                    });
                }


                newUser.save()
                    .then((savedUser) => {
                        return savedUser.hashPasswordAndSave(password);
                    })
                    .then((savedUser) => {
                        return done(null, getJWT(savedUser), savedUser.info);
                    })
                    .catch((error) => {
                        return done(error);
                    });
            }
        });

        });

}));

/**
 * Facebook login handler.
 * User will already have logged in client side, and this is to serialize the user
 * into the database.
 * Will add the user if it does not already exist.
 * Will connect the accounts if the user already has a Local-login.
 */
module.exports.facebookAuth = function (profile) {
    return new Promise((resolve, reject) => {
        // The Facebook-profile has an associated email-address.
        if (profile.email) {
            Volunteer.findOne({'info.email': profile.email}, (err, user) => {
                // Check if user is already registred as an organization
                Organization.findOne({'info.email': profile.email}, (err, orgUser) => {
                    if (err) {
                        return reject(err);
                    }

                    if (orgUser) {
                        let error = new Error('Cannot use the same email-address as an organization and a volunteer. Please sign up with another email.');
                        error.name = 'AccountMismatchError';

                        return reject(error);
                    }

                    // The user already has a local login.
                    if (user) {
                        user.facebook.id = profile.id;
                        user.facebook.email = user.info.email;
                        user.save()
                            .then(() => {
                                let response = {};
                                response.token = getJWT(user);
                                response.userData = user.info;

                                return resolve(response);
                            })
                            .catch((error) => {
                                return resolve(error);
                            });
                    }
                });
            });
        }

        // Facebook-profile does not have an associated email address.
        // Or user did not have a local login.
        Volunteer.findOne({'facebook.id': profile.id}, (err, user) => {

            // Something went wrong.
            if (err) {
                return reject(err);
            }

            // The user already exists.
            if (user) {
                let response = {};
                response.token = getJWT(user);
                response.userData = user.info;

                return resolve(response);
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

                if (profile.email) {
                    newUser.info.email = profile.email;
                    newUser.facebook.email = profile.email;
                }

                newUser.save()
                    .then((savedUser) => {
                        let response = {};
                        response.token = getJWT(savedUser);
                        response.userData = savedUser.info;

                        return resolve(response);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
            }
        });
    });
};

// Put the user in the database.
passport.serializeUser((userJWT, done) => {
    return done(null, userJWT);
});

// Retrieve the user from the database.
passport.deserializeUser((userJWT, done) => {
    let decoded = jwt.verify(userJWT, process.env.JWT_SECRET);

    Volunteer.findById(decoded.sub, (err, user) => {
        if (err) {
            return done(err);
        }

        return done(null, user);
    });
});

/**
 * Generates a JWT to send back for authentication.
 * @param user the user to generate the token for.
 * @returns {*} the token.
 */
function getJWT(user) {
    let payload = {
        scopes: user.info.roles,
        sub: user._id
    };

    return jwt.sign(payload, process.env.JWT_SECRET);
}
