/**
 * Router for the login handling pages.
 */

// Requires.
let router = require('express').Router();
let passport = require('passport');
let validateLoginForm = require('../middleware/middleware').validateLoginForm;

// Routes---------------------------------------------------------------------------------------------------------------

router.post('/local', validateLoginForm, (req, res, next) => {
    return passport.authenticate('local', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    summary: err.message
                });
            } else {
                return res.status(400).json({
                    success: false,
                    summary: 'Could not process the form.'
                });
            }
        }

        return res.json({
            success: true,
            summary: 'You have successfully logged in!',
            token,
            user: userData
        });

    })(req, res, next);
});

router.route('/facebook')
    .get(passport.authenticate('facebook', { scope: ['public_profile', 'email']}));

router.route('/facebook/return')
    .get(passport.authenticate('facebook'), (req, res) => {
        return res.redirect('/');
    });


// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
