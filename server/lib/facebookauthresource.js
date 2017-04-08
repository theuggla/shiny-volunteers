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
            clientID: '1219936468104276',
            clientSecret: '6f64667cbf8cd6953ef782085bc2201e',
            callbackURL: 'http://localhost:8000/login/facebook/return',
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
                    }

                    let payload = {
                        sub: user.id
                    };

                    // create a token string
                    let token = jwt.sign(payload, process.env.JWT_SECRET);
                    let data = {
                        email: user.email
                    };

                    return done(null, token, data);
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
