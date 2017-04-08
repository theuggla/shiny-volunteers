/**
 * Module to authenticate the user through Facebook
 * with the passport module
 * and save the user into the site's database.
 */

//Requires.
let passport = require('passport');
let Strategy = require('passport-facebook').Strategy;
let Volunteer = require('../models/Volunteer');


/**
 * Initialize the authentication and set up the handling
 * against the database.
 */
function connect() {
    passport.use(new Strategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: process.env.SITE_URL + '/login/facebook/return',
        },

        function(accessToken, refreshToken, profile, done) {
                Volunteer.findOrCreate({facebookid: profile.id}, function(err, user, created) {
                    if (err) return done(err, false);

                    if (created)
                    {
                        if (profile.email)
                        {
                            user.email = profile.email;
                        }
                        user.id = user._id;
                        user.roles.push('volunteer');
                        user.save();
                    } else {
                        let payload = {
                            sub: user.id
                        };

                        // create a token string
                        let token = jwt.sign(payload, process.env.JWT_SECRET);
                        let data = {
                            email: user.email
                        };

                        return done(null, token, data);
                    }
                });
        }));


    passport.serializeUser((user, done) => {
        done(null, user.facebookid);
    });

    passport.deserializeUser((userid, done) => {
        Volunteer.find({facebookid: userid})
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error);
            });
    });
}

//Exports.
module.exports = {
    connect: connect
};
