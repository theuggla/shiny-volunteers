/**
 * Defines middlewares.
 */


let Volunteer = require('../models/Volunteer');

//Define Middleware----------------------------------------------------------------------------------------------------

/**
 *  The Auth Checker middleware function.
 */
module.exports.checkIfAuthorized = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    //get the token
    const token = req.headers.authorization.split(' ')[1];

    // decode the token
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;

        // check if a user exists
        return Volunteer.findById(userId, (err, user) => {
            if (user || !user) {
                return res.status(401).end();
            }

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
