/**
 * Router for the login handling pages.
 */

// Requires.
let router = require('express').Router();
let passport = require('passport');
let facebookAuth = require('../lib/authresource').facebookAuth;
let confirmTempUser = require('../lib/authresource').confirmTempUser;
let validateLoginForm = require('../middleware/middleware').validateLoginForm;

// Routes---------------------------------------------------------------------------------------------------------------

router.post('/local', validateLoginForm, (req, res, next) => {
    if (req.body)
    return passport.authenticate('local', (err, token, userData) => {
        if (err) {
            console.error(err);
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    summary: err.message
                });
            } else if (err.name === 'AccountMismatchError') {
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
            token: token,
            user: userData
        });

    })(req, res, next);
});

router.route('/facebook')
    .post((req, res) => {
    facebookAuth(req.body)
        .then((response) => {
            res.json({
                success: true,
                summary: 'You have successfully logged in!',
                token : response.token,
                user: response.userData
            });
        })
        .catch((err) => {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    summary: err.message
                });
            } else if (err.name === 'AccountMismatchError') {
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
        });
    });

router.route('/email-verification/:URL')
    .get((req, res, next) => {
        console.log('got here to verification place');
        let url = req.params.URL;

        confirmTempUser(url)
            .then((response) => {
                res.json({
                    success: true,
                    summary: 'You have successfully confirmed your account!',
                    token : response.token,
                    user: response.userData
                });
            })
            .catch((error) => {
                return next(error);
            });
    });

// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
