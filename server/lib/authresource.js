'use strict';

// Requires.
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let Volunteer = require('../models/Volunteer');
let Organization = require('../models/Organization');
let TempUser = require('../models/TempUser');
let jwt = require('jsonwebtoken');
let verify = require('./verificationresource').verify;


/**
 * Local Passport-strategy.
 * Will add the user if it does not already exist.
 * Will connect the accounts if the user already has a Facebook-login.
 */
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password', session: false, passReqToCallback: true}, (req, email, password, done) => {
    switch (req.body.role) {
        case 'organization':
            isOrganization({email: email})
                .then((user) => {
                    if (user) {
                        tryLogin(user, password)
                            .then((loggedInUser) => {
                                return done(null, getJWT(loggedInUser), loggedInUser.info);
                            })
                            .catch((error) => {
                                return done(error);
                            });
                    } else {
                        isVolunteer({email: email})
                            .then((user) => {
                                if (user) {
                                    let err = new Error('Cannot use the same email-address as an organization and a volunteer. Please sign up with another email.');
                                    err.name = 'AccountMismatchError';

                                    return done(err);
                                } else {
                                    createNewTempUser({
                                        info: {
                                            email: email.trim(),
                                            role: 'organization'
                                        },
                                        local: {
                                            email: email.trim(),
                                            password: password
                                        }
                                    })
                                        .then((createdUser) => {
                                            return done(null, getJWT(createdUser), createdUser.info);
                                        })
                                        .catch((error) => {
                                            return done(error);
                                        });
                                }
                            });
                    }
                })
                .catch((err) => {
                    return done(err);
                });
            break;
        case 'volunteer':
            isVolunteer({email: email})
                .then((user) => {
                    if (user) {
                        tryLogin(user, password)
                            .then((loggedInUser) => {
                                return done(null, getJWT(loggedInUser), loggedInUser.info);
                            })
                            .catch((error) => {
                                return done(error);
                            });
                    } else {
                        isOrganization({email: email})
                            .then((user) => {
                                if (user) {
                                    let err = new Error('Cannot use the same email-address as an organization and a volunteer. Please sign up with another email.');
                                    err.name = 'AccountMismatchError';

                                    return done(err);
                                } else {
                                    createNewTempUser({
                                        info: {
                                            email: email.trim(),
                                            role: 'volunteer'
                                        },
                                        facebook: {},
                                        local: {
                                            email: email.trim(),
                                            password: password
                                        }
                                    })
                                        .then((user) => {
                                            return done(null, getJWT(user), user.info);
                                        })
                                        .catch((error) => {
                                            return done(error);
                                        });
                                }
                            });
                    }
                })
                .catch((err) => {
                    return done(err);
                });
            break;
        default:
            return done(new Error('No such role.'));
    }
})
);

/**
 * Facebook login handler.
 * User will already have logged in client side, and this is to serialize the user
 * into the database.
 * Will add the user if it does not already exist.
 * Will connect the accounts if the user already has a Local-login.
 * @param profile {Object} the information about the user gotten from facebook.
 */
module.exports.facebookAuth = function (profile) {
    return new Promise((resolve, reject) => {
        // The Facebook-profile has an associated email-address.
        if (profile.email) {
            isOrganization({email: profile.email})
                .then((user) => {
                    if (user) {
                        let error = new Error('Cannot use the same email-address as an organization and a volunteer. Please sign up with another email.');
                        error.name = 'AccountMismatchError';

                        throw error;
                    }

                    isVolunteer({email: profile.email})
                        .then((user) => {
                            // User already has local login.
                            if (user) {
                                user.facebook.id = profile.id;
                                user.facebook.email = user.info.email;
                                user.save()
                                    .then(() => {
                                        let response = {};
                                        response.token = getJWT(user);
                                        response.userData = user.info;

                                        resolve(response);
                                    })
                                    .catch((error) => {
                                        throw error;
                                    });
                            }
                        })
                        .catch((error) => {
                            throw error;
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        }

        // Facebook-profile does not have an associated email address, or
        // User did not have a local login.
        isVolunteer({facebookID: profile.id})
            .then((user) => {
                // The user already exists.
                if (user) {
                    let response = {};
                    response.token = getJWT(user);
                    response.userData = user.info;

                    resolve(response);
                }

                createNewUser({
                    info: {
                        email: profile.email,
                        role: 'volunteer'
                    },
                    facebook: {
                        id: profile.id,
                        email: profile.email
                    },
                    local: {}
                })
                    .then((createdUser) => {
                        let response = {};
                        response.token = getJWT(createdUser);
                        response.userData = createdUser.info;

                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });


            })
            .catch((error) => {
                reject(error);
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

/**
 * Checks if a user is registered as a volunteer.
 * @param user the user to look for.
 * @returns a Promise that resolves with the user if found, null if not found, and rejects with any errors.
 */
function isVolunteer(user) {
    return new Promise((resolve, reject) => {
        if (user.id) {
            Volunteer.findById(user.id, (err, volUser) => {
                if (err) {
                    reject(err);
                }
                resolve(volUser);
            });
        } else if (user.email) {
            Volunteer.findOne({'info.email': user.email.trim()}, (err, volUser) => {
                if (err) {
                    reject(err);
                }
                resolve(volUser);
            });
        } else if (user.facebookID) {
            Volunteer.findOne({'facebook.id': user.facebookID}, (err, volUser) => {
                if (err) {
                    reject(err);
                }
                resolve(volUser);
            });
        }
        else {
            resolve(null);
        }
    });
}

/**
 * Checks if a user is registered as an organization.
 * @param user the user to look for.
 * @returns a Promise that resolves with the user if found, null if not found, and rejects with any errors.
 */
function isOrganization(user) {
    return new Promise((resolve, reject) => {
        if (user.id) {
            Organization.findById(user.id, (err, orgUser) => {
                if (err) {
                    reject(err);
                }
                resolve(orgUser);
            });
        } else if (user.email) {
            Organization.findOne({'info.email': user.email.trim()}, (err, orgUser) => {
                if (err) {
                    reject(err);
                }
                resolve(orgUser);
            });
        } else {
            resolve(null);
        }
    });
}

/**
 * Tries to log a user ín with a password,
 * If the user is only registered over facebook, creates a local login with the given password.
 * @param user {User} the user to log in.
 * @param password {string} the password from the user.
 * @returns {Promise} a promise that resolves with the logged in user or rejects with an error.
 */
function tryLogin(user, password) {
    return new Promise((resolve, reject) => {
        if (user.local && user.local.password) {
            user.comparePassword(password.trim())
                .then((isMatch) => {
                    if (!isMatch) {
                        let error = new Error('Incorrect password');
                        error.name = 'IncorrectCredentialsError';

                        reject(error);
                    }

                    resolve(user);
                })
                .catch((err) => {
                    reject(err);
                });
        }

        // User exists with a Facebook login an no Local login.
        user.local.email = user.info.email;
        user.save()
            .then((savedUser) => {
                return savedUser.hashPasswordAndSave(password);
            })
            .then((savedUser) => {
                resolve(savedUser);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * Creates a new temporary user, to be saved while waiting for email verification.
 * @param user {Object} an object with information about the user to create.
 * @returns {Promise} that resolves with the newly created user or rejects with an error.
 */
function createNewTempUser(user) {
    return new Promise((resolve, reject) => {
        let newUser;

        newUser = new TempUser({
            info  : {
                email       : user.info.email,
                roles       : [user.info.role, 'temp'],
                completed   : false
            },
            local : {
                email       : user.local.email
            },
            profile : {
                isComplete  : false
            },
            password        : user.password
        });

        verify.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
            if (err) {
                reject(new Error('something went wrong'));
            }

            if (existingPersistentUser) {
                reject(new Error('user already exists'));
            }

            if (newTempUser) {
                let URL = newTempUser[verify.options.URLFieldName];

                verify.sendVerificationEmail(user.info.email, URL, function(err, info) {
                    if (err) {
                        reject(new Error('fail'));
                    }
                    resolve(newTempUser);
                });

            } else {
                reject(new Error('user already signed up. check your email.'));
            }
        });

    });
}

/**
 * Transfer a temporary user from the temporary collection to the persistent
 * user collection, removing the URL assigned to it.
 *
 * @func confirmTempUser
 * @param {string} url - the randomly generated URL assigned to a unique email
 */
module.exports.confirmTempUser = function(url) {
    return new Promise((resolve, reject) => {
        let persistantUser;

        TempUser.findOne({GENERATED_VERIFYING_URL: url})
            .then((tempUserData) => {
            console.log(tempUserData);

                if (tempUserData) {
                    return createNewUser(JSON.parse(JSON.stringify(tempUserData)));
                }
            })
            .then((user) => {
                persistantUser = user;
            })
            .then(() => {
                return TempUser.remove({GENERATED_VERIFYING_URL: url});
            })
            .then(() => {
                let result = {
                    userData: persistantUser.info,
                    token: getJWT(persistantUser)
                };
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

/**
 * Creates a new user.
 * @param user {Object} an object with information about the user to create.
 * @returns {Promise} that resolves with the newly created user or rejects with an error.
 */
function createNewUser(user) {
    return new Promise((resolve, reject) => {
        let newUser;

        if (user.info.role === 'volunteer') {
            newUser = new Volunteer({
                info  : {
                    email       : user.info.email,
                    roles       : [user.info.role]
                },
                local : {
                    email       : user.local.email
                },
                facebook: {
                    email       : user.facebook.email,
                    id          : user.facebook.id
                },
                profile : {
                    isComplete  : false
                }
            });
        } else {
            newUser = new Organization({
                info  : {
                    email       : user.info.email,
                    roles       : [user.info.role]
                },
                local : {
                    email       : user.local.email
                }
            });
        }

        newUser.save()
            .then((savedUser) => {
                return savedUser.local.email ? savedUser.hashPasswordAndSave(user.password) : Promise.resolve(savedUser);
            })
            .then((savedUser) => {
                resolve(savedUser);
            })
            .catch((error) => {
                reject(error);
            });

    });
}
