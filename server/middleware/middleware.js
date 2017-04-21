/**
 * Defines middlewares.
 */

let Volunteer = require('../models/Volunteer');
let jwt = require('jsonwebtoken');

/**
 *  The Auth Checker middleware function.
 */
module.exports.checkIfAuthorized = function(req, res, next) {
    console.log('checking for auth');
    console.log(req.headers);
    if (!req.headers.authorization) {
        console.log('no auth header!');
        return res.status(401).end();
    }

    // Get the token.
    const token = req.headers.authorization.split(' ')[1];
    console.log('token: ' + token);

    // Decode the token.
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('error in jwt!');
            return res.status(401).end();
        }

        const userId = decoded.sub;

        // Check if a user exists.
        return Volunteer.findById(userId, (err, user) => {
            console.log('looking for user with user id ' + userId);
            if (err || !user) {
                console.log('did not find that user!');
                return res.status(401).end();
            }

            req.user = user;

            return next();
        });
    });
};


/**
 * The login form-validating middleware.
 */

module.exports.validateLoginForm = function(req, res, next) {
    const errors = {};
    let payload = req.body;
    let isFormValid = true;
    let summary = '';

    if (req.body.token) {
        console.log('got here');
        return next();
    }

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !(/.+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(payload.email))) {
        isFormValid = false;
        errors.email = 'Please provide an email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide a password.';
    }

    if (!isFormValid) {
        return res.status(400).send({
            summary,
            errors
        });
    }

    return next();
};
