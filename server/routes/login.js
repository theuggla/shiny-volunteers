/**
 * Router for the login handling pages.
 */

// Requires.
let router = require('express').Router();
let passport = require('passport');
let cwd = __dirname ? __dirname : process.cwd();
let path = require('path');

let facebookAuth = require('../lib/authresource').facebookAuth;
let createNewTempUser = require('../lib/authresource').createNewTempUser;
let validateLoginForm = require('../middleware/middleware').validateLoginForm;
let isDatabaseConnected = require('../middleware/middleware').isDatabaseConnected;
let confirmTempUser = require('../lib/authresource').confirmTempUser;

// Routes---------------------------------------------------------------------------------------------------------------

router.post('/local', validateLoginForm, isDatabaseConnected, (req, res, next) => {
    if (req.body) {
        return passport.authenticate('local', (err, token, userData) => {
            if (err) {
                switch (err.name) {
                    case 'IncorrectCredentialsError': {
                        return res.status(400).json({
                            success: false,
                            summary: err.message
                        });
                    }
                    case 'AccountMismatchError': {
                        return res.status(400).json({
                            success: false,
                            summary: err.message
                        });
                    }
                    case 'NoSuchUserError': {
                        return res.status(404).json({
                            success: false,
                            summary: err.message
                        });
                    }
                    default: {
                        return res.status(400).json({
                            success: false,
                            summary: 'Could not process the form.'
                        });
                    }
                }
            }

            return res.json({
                success: true,
                summary: 'You have successfully logged in!',
                token: token,
                user: userData
            });

        })(req, res, next);
    }

    return res.status(400).json({
        success: false,
        summary: 'No credentials in the login request.'
    });
});

router.post('/local/signup', validateLoginForm, isDatabaseConnected, (req, res, next) => {
    let user = req.body;

    createNewTempUser({
        info: {
            email: user.email.trim(),
            role: user.role
        },
        local: {
            email: user.email.trim(),
            password: user.password
        }
    })
        .then(() => {
            res.json({
                success: true,
                summary: 'You have been sent a confirmation email! Confirm through the link and then return here to log in.'
            });
        })
        .catch((error) => {
            if (error.name === 'DuplicateUserError') {
                return res.status(400).json({
                    success: false,
                    summary: error.message
                });
            } else if (error.name === 'DuplicateUserError') {
                return res.status(400).json({
                    success: false,
                    summary: error.message
                });
            } else {
                return next(error);
            }
        });
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
        let url = req.params.URL;

        confirmTempUser(url)
            .then((response) => {
                return res.end();
            })
            .catch((error) => {
                return next(error);
            });
    });

// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
