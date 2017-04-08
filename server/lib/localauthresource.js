/**
 * Module to authenticate the user without
 * with the passport module
 * and save the user into the site's database.
 */

//Requires.
let passport = require('passport');
let Strategy = require('passport-local').Strategy;
let Volunteer = require('../models/Volunteer');



/**
 * Initialize the authentication and set up the handling
 * against the database.
 */
function connect() {
    passport.use(
        new Strategy(

        {usernameField: 'email'},

        (username, password, cb) => {
            Volunteer.findOrCreate({email: username}, (err, user, created) => {
                if (err) { return cb(err); }

                if (!user) { return cb(null, false); }

                if (created) {
                    user.id = user._id;
                    user.roles.push('volunteer');
                    user.hashPasswordAndSave(password);
                } else {
                    user.comparePassword(password)
                        .then((result) => {
                            if (result) return cb(null, user);
                            return cb(null, false);
                        })
                        .catch((error) => {
                            return cb(error, false);
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
