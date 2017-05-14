/**
 * Defines middlewares.
 */

// Requires ----------------------------------------------------------------------------------------------------------
let Volunteer = require('../models/Volunteer');
let Organization = require('../models/Organization');
let db = require('../lib/dbresource');
let jwt = require('jsonwebtoken');


// Middlewares -------------------------------------------------------------------------------------------------------
/**
 *  The Auth Checker middleware function.
 */
module.exports.checkIfAuthorized = function(req, res, next) {
    if (!req.headers.authorization) {
        return next();
    }

    // Get the token.
    const token = req.headers.authorization.split(' ')[1];

    // Decode the token.
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next();
        }

        const userId = decoded.sub;
        const role = decoded.scopes[0];

        switch (role) {
            case 'organization':
                return Organization.findById(userId, (error, user) => {
                    if (error || !user) {
                        return next();
                    }

                    req.user = user;

                    return next();
                });
            case 'volunteer':
                return Volunteer.findById(userId, (error, user) => {
                    if (error || !user) {
                        return next();
                    }

                    req.user = user;

                    return next();
                });
            default:
                return next();
        }
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

/**
 *  Check for database connection.
 */
module.exports.isDatabaseConnected = function(req, res, next) {
    const errors = {};
    let summary = 'We have lost connection to the database. Please try again later.';

    if (db.isConnected) {
        return next();
    } else {
        return res.status(500).send({
            summary,
            errors
        });
    }
};
